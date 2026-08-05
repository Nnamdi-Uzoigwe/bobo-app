// import { foodData } from "@/data/foodData";
// import { useLocalSearchParams } from "expo-router";
// import { Text, View } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";

// export default function ProductDetail() {
//   const { id } = useLocalSearchParams();

//   const product = foodData.find((item) => item.id === id);

//   if (!product) {
//     return (
//       <View>
//         <Text>Product not found</Text>
//       </View>
//     );
//   }
//   return <SafeAreaView></SafeAreaView>;
// }

import DetailDescription from "@/components/product-detail/DetailDescription";
import DetailHeader from "@/components/product-detail/DetailHeader";
import { foodData } from "@/data/foodData";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProductDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const product = foodData.find((item) => item.id === id);

  if (!product) {
    return (
      <View>
        <Text>Product not found</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <DetailHeader />
        <DetailDescription
          id={product.id}
          image={product.image}
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
});
