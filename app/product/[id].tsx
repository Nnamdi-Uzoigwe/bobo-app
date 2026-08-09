// import DetailDescription from "@/components/product-detail/DetailDescription";
// import DetailHeader from "@/components/product-detail/DetailHeader";
// import { foodData } from "@/data/foodData";
// import { useLocalSearchParams } from "expo-router";
// import { ScrollView, StyleSheet, Text, View } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";

// export default function ProductDetail() {
//   const { id } = useLocalSearchParams<{ id: string }>();

//   const product = foodData.find((item) => item.id === id);

//   if (!product) {
//     return (
//       <View>
//         <Text>Product not found</Text>
//       </View>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView>
//         <DetailHeader
//           id={product.id}
//           image={product.image}
//           name={product.name}
//           price={product.price}
//         />
//         <DetailDescription
//           id={product.id}
//           image={product.image}
//           rating={product.rating}
//           calories={product.kcal}
//           category={product.category}
//           name={product.name}
//           price={product.price}
//           description={product.description}
//         />
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: "white",
//     flex: 1,
//     paddingHorizontal: 10,
//   },
// });

import AppText from "@/components/AppText";
import DetailDescription from "@/components/product-detail/DetailDescription";
import DetailHeader from "@/components/product-detail/DetailHeader";
import { apiGet } from "@/lib/api";
import { useAuthStore } from "@/store/authStore";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type MenuItem = {
  _id: string;
  name: string;
  price: number;
  rating: number;
  image: string;
  description: string;
  kcal: number;
  category: string;
};

export default function ProductDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const token = useAuthStore((s) => s.token);

  const [product, setProduct] = useState<MenuItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadProduct() {
      setLoading(true);
      setError("");
      try {
        const data = await apiGet(`/menu/${id}`, token ?? undefined);
        if (isMounted) setProduct(data);
      } catch (err: any) {
        if (isMounted) setError(err.message || "Failed to load product");
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    if (id) loadProduct();

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, styles.centered]}>
        <ActivityIndicator size="small" color="#5EAD1D" />
      </SafeAreaView>
    );
  }

  if (error || !product) {
    return (
      <SafeAreaView style={[styles.container, styles.centered]}>
        <AppText size={15} color="#9CA3AF">
          {error || "Product not found"}
        </AppText>
      </SafeAreaView>
    );
  }

  const imageSource = { uri: product.image };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <DetailHeader
          id={product._id}
          image={imageSource}
          name={product.name}
          price={product.price}
        />
        <DetailDescription
          id={product._id}
          image={imageSource}
          rating={product.rating}
          calories={product.kcal}
          category={product.category}
          name={product.name}
          price={product.price}
          description={product.description}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    paddingHorizontal: 10,
  },
  centered: {
    alignItems: "center",
    justifyContent: "center",
  },
});
