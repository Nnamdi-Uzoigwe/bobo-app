import CategoryCard from "@/components/explore/CategoryCard";
import { categories } from "@/constants/categories";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { ScrollView, StyleSheet, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ExploreScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchBar}>
        <Feather name="search" size={18} color="#9CA3AF" />
        <TextInput
          placeholder="search for food..."
          placeholderTextColor="#9CA3AF"
          style={styles.searchInput}
        />
      </View>

      <ScrollView
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      >
        {categories.map((cat) => (
          <CategoryCard
            key={cat.id}
            label={cat.label}
            image={cat.image}
            onPress={() => router.push(`/explore/${cat.id}`)}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 15,
    paddingHorizontal: 10,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderWidth: 1,
    borderColor: "#E2E6DF",
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 48,
    marginTop: 10,
    marginBottom: 16,
  },
  searchInput: { flex: 1, fontSize: 15, color: "#363A33" },
  list: { paddingBottom: 100 },
});
