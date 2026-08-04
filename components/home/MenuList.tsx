import { foodData, type FoodItem } from "@/data/foodData";
import { useRouter } from "expo-router";
import { FlatList, StyleSheet } from "react-native";
import MenuCard from "./MenuCard";

type MenuListProps = {
  category?: string;
};

export default function MenuList({ category = "All" }: MenuListProps) {
  const router = useRouter();

  const data =
    category === "All"
      ? foodData
      : foodData.filter((item) => item.category === category);

  const handlePress = (item: FoodItem) => {
    // router.push(`/product/${item.id}`);
  };

  const handleAddPress = (item: FoodItem) => {
    // TODO: wire up to cart/state management
    console.log("added to cart:", item.name);
  };

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
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
});
