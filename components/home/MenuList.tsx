// // import { foodData, type FoodItem } from "@/data/foodData";
// // import { useRouter } from "expo-router";
// // import { FlatList, StyleSheet } from "react-native";
// // import MenuCard from "./MenuCard";

// // type MenuListProps = {
// //   category?: string;
// // };

// // export default function MenuList({ category = "All" }: MenuListProps) {
// //   const router = useRouter();

// //   const data =
// //     category === "All"
// //       ? foodData
// //       : foodData.filter((item) => item.category === category);

// //   const handlePress = (item: FoodItem) => {
// //     router.push(`/product/${item.id}`);
// //   };

// //   const handleAddPress = (item: FoodItem) => {
// //     console.log("added to cart:", item.name);
// //   };

// //   return (
// //     <FlatList
// //       data={data}
// //       keyExtractor={(item) => item.id}
// //       numColumns={2}
// //       columnWrapperStyle={styles.row}
// //       contentContainerStyle={styles.container}
// //       showsVerticalScrollIndicator={false}
// //       scrollEnabled={false}
// //       nestedScrollEnabled={false}
// //       renderItem={({ item }) => (
// //         <MenuCard
// //           item={item}
// //           onPress={handlePress}
// //           onAddPress={handleAddPress}
// //         />
// //       )}
// //     />
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     gap: 16,
// //     paddingBottom: 24,
// //   },
// //   row: {
// //     gap: 14,
// //   },
// // });

// import { apiGet } from "@/lib/api";
// import { useAuthStore } from "@/store/authStore";
// import { useRouter } from "expo-router";
// import { useEffect, useState } from "react";
// import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
// import AppText from "../AppText";
// import MenuCard from "./MenuCard";

// export type MenuItem = {
//   _id: string;
//   name: string;
//   price: number;
//   rating: number;
//   image: string;
//   description: string;
//   kcal: number;
//   category: string;
// };

// type MenuListProps = {
//   category?: string;
// };

// export default function MenuList({ category = "All" }: MenuListProps) {
//   const router = useRouter();
//   const token = useAuthStore((s) => s.token);

//   const [items, setItems] = useState<MenuItem[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     let isMounted = true;

//     async function loadMenu() {
//       setLoading(true);
//       setError("");
//       try {
//         const data = await apiGet("/menu", token ?? undefined);
//         if (isMounted) setItems(data);
//       } catch (err: any) {
//         if (isMounted) setError(err.message || "Failed to load menu");
//       } finally {
//         if (isMounted) setLoading(false);
//       }
//     }

//     loadMenu();

//     return () => {
//       isMounted = false;
//     };
//   }, []);

//   const data =
//     category === "All"
//       ? items
//       : items.filter((item) => item.category === category);

//   const handlePress = (item: MenuItem) => {
//     router.push(`/product/${item._id}`);
//   };

//   const handleAddPress = (item: MenuItem) => {
//     console.log("added to cart:", item.name);
//   };

//   if (loading) {
//     return (
//       <View style={styles.centered}>
//         <ActivityIndicator size="small" color="#5EAD1D" />
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={styles.centered}>
//         <AppText size={14} color="#9CA3AF">
//           {error}
//         </AppText>
//       </View>
//     );
//   }

//   return (
//     <FlatList
//       data={data}
//       keyExtractor={(item) => item._id}
//       numColumns={2}
//       columnWrapperStyle={styles.row}
//       contentContainerStyle={styles.container}
//       showsVerticalScrollIndicator={false}
//       scrollEnabled={false}
//       nestedScrollEnabled={false}
//       renderItem={({ item }) => (
//         <MenuCard
//           item={item}
//           onPress={handlePress}
//           onAddPress={handleAddPress}
//         />
//       )}
//     />
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     gap: 16,
//     paddingBottom: 24,
//   },
//   row: {
//     gap: 14,
//   },
//   centered: {
//     paddingVertical: 40,
//     alignItems: "center",
//   },
// });

import { useMenuStore, type MenuItem } from "@/store/menuStore";
import { useRouter } from "expo-router";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import AppText from "../AppText";
import MenuCard from "./MenuCard";

type MenuListProps = {
  category?: string;
  search?: string;
};

export default function MenuList({
  category = "All",
  search = "",
}: MenuListProps) {
  const router = useRouter();
  const items = useMenuStore((s) => s.items);
  const loading = useMenuStore((s) => s.loading);
  const error = useMenuStore((s) => s.error);

  let data =
    category === "All"
      ? items
      : items.filter((item) => item.category === category);

  if (search.trim() !== "") {
    const query = search.trim().toLowerCase();
    data = data.filter((item) => item.name.toLowerCase().includes(query));
  }

  const handlePress = (item: MenuItem) => {
    router.push(`/product/${item._id}`);
  };

  const handleAddPress = (item: MenuItem) => {
    console.log("added to cart:", item.name);
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="small" color="#5EAD1D" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <AppText size={14} color="#9CA3AF">
          {error}
        </AppText>
      </View>
    );
  }

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item._id}
      numColumns={2}
      columnWrapperStyle={styles.row}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      scrollEnabled={false}
      nestedScrollEnabled={false}
      renderItem={({ item }) => (
        <MenuCard
          item={item}
          onPress={handlePress}
          onAddPress={handleAddPress}
        />
      )}
      ListEmptyComponent={
        <AppText size={14} color="#9CA3AF" style={styles.emptyText}>
          No items match your search.
        </AppText>
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
    paddingBottom: 24,
  },
  row: {
    gap: 14,
  },
  centered: {
    paddingVertical: 40,
    alignItems: "center",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
  },
});
