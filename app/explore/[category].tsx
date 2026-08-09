// import AppText from "@/components/AppText";
// import FiltersModal from "@/components/explore/FiltersModal";
// import FoodResultCard from "@/components/explore/FoodResultCard";
// import { foodData } from "@/data/foodData";
// import { useCartStore } from "@/store/cartStore";
// import { Feather } from "@expo/vector-icons";
// import { router, useLocalSearchParams } from "expo-router";
// import { useMemo, useState } from "react";
// import {
//     FlatList,
//     StyleSheet,
//     TextInput,
//     TouchableOpacity,
//     View,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";

// export default function ExploreResultsScreen() {
//   const { category } = useLocalSearchParams<{ category: string }>();
//   const [filtersVisible, setFiltersVisible] = useState(false);
//   const addToCart = useCartStore((s) => s.addToCart);

//   const results = useMemo(
//     () => foodData.filter((item) => item.category === category),
//     [category],
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.searchRow}>
//         <View style={styles.searchBar}>
//           <Feather name="search" size={18} color="#9CA3AF" />
//           <TextInput
//             defaultValue={category}
//             placeholderTextColor="#9CA3AF"
//             style={styles.searchInput}
//           />
//         </View>

//         <TouchableOpacity
//           onPress={() => setFiltersVisible(true)}
//           style={styles.filterButton}
//         >
//           <Feather name="sliders" size={18} color="#363a33" />
//         </TouchableOpacity>
//       </View>

//       <FlatList
//         data={results}
//         keyExtractor={(item) => item.id}
//         contentContainerStyle={styles.list}
//         ListEmptyComponent={
//           <AppText
//             color="#61685c"
//             style={{ marginTop: 40, textAlign: "center" }}
//           >
//             No items in this category yet
//           </AppText>
//         }
//         renderItem={({ item }) => (
//           <FoodResultCard
//             item={item}
//             onPress={() => router.push(`/product/${item.id}`)}
//             onAdd={() =>
//               addToCart({
//                 id: item.id,
//                 name: item.name,
//                 image: item.image,
//                 price: item.price,
//               })
//             }
//           />
//         )}
//       />

//       <FiltersModal
//         visible={filtersVisible}
//         onClose={() => setFiltersVisible(false)}
//         resultCount={results.length}
//       />
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "white", paddingHorizontal: 16 },
//   searchRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 10,
//     marginTop: 10,
//     marginBottom: 16,
//   },
//   searchBar: {
//     flex: 1,
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 10,
//     borderWidth: 1,
//     borderColor: "#E2E6DF",
//     borderRadius: 14,
//     paddingHorizontal: 14,
//     height: 48,
//   },
//   searchInput: {
//     flex: 1,
//     fontSize: 15,
//     color: "#363A33",
//     textTransform: "capitalize",
//   },
//   filterButton: {
//     width: 48,
//     height: 48,
//     borderRadius: 14,
//     borderWidth: 1,
//     borderColor: "#E2E6DF",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   list: { paddingBottom: 100, gap: 4 },
// });

import AppText from "@/components/AppText";
import FiltersModal from "@/components/explore/FiltersModal";
import FoodResultCard from "@/components/explore/FoodResultCard";
import { apiGet } from "@/lib/api";
import { useAuthStore } from "@/store/authStore";
import { useCartStore } from "@/store/cartStore";
import type { MenuItem } from "@/store/menuStore";
import { Feather } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ExploreResultsScreen() {
  const { category } = useLocalSearchParams<{ category: string }>();
  const [filtersVisible, setFiltersVisible] = useState(false);
  const addToCart = useCartStore((s) => s.addToCart);
  const token = useAuthStore((s) => s.token);

  const [results, setResults] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadResults() {
      setLoading(true);
      setError("");
      try {
        const data = await apiGet(
          `/menu?category=${encodeURIComponent(category)}`,
          token ?? undefined,
        );
        if (isMounted) setResults(data);
      } catch (err: any) {
        if (isMounted) setError(err.message || "Failed to load results");
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    if (category) loadResults();

    return () => {
      isMounted = false;
    };
  }, [category]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchRow}>
        <View style={styles.searchBar}>
          <Feather name="search" size={18} color="#9CA3AF" />
          <TextInput
            defaultValue={category}
            placeholderTextColor="#9CA3AF"
            style={styles.searchInput}
          />
        </View>

        <TouchableOpacity
          onPress={() => setFiltersVisible(true)}
          style={styles.filterButton}
        >
          <Feather name="sliders" size={18} color="#363a33" />
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="small" color="#5EAD1D" />
        </View>
      ) : error ? (
        <View style={styles.centered}>
          <AppText size={14} color="#9CA3AF">
            {error}
          </AppText>
        </View>
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <AppText
              color="#61685c"
              style={{ marginTop: 40, textAlign: "center" }}
            >
              No items in this category yet
            </AppText>
          }
          renderItem={({ item }) => (
            <FoodResultCard
              item={item}
              onPress={() => router.push(`/product/${item._id}`)}
              onAdd={() =>
                addToCart({
                  id: item._id,
                  name: item.name,
                  image: { uri: item.image },
                  price: item.price,
                })
              }
            />
          )}
        />
      )}

      <FiltersModal
        visible={filtersVisible}
        onClose={() => setFiltersVisible(false)}
        resultCount={results.length}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white", paddingHorizontal: 16 },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 10,
    marginBottom: 16,
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderWidth: 1,
    borderColor: "#E2E6DF",
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 48,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: "#363A33",
    textTransform: "capitalize",
  },
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E2E6DF",
    alignItems: "center",
    justifyContent: "center",
  },
  list: { paddingBottom: 100, gap: 4 },
  centered: { marginTop: 40, alignItems: "center" },
});
