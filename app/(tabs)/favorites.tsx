import AppText from "@/components/AppText";
import EmptyFavorites from "@/components/favorites/EmptyFavorites";
import FavoriteItem from "@/components/favorites/FavoriteItem";
import { useFavoritesStore } from "@/store/favoritesStore";
import { router } from "expo-router";
import { FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Favorites() {
  const items = useFavoritesStore((s) => s.items);
  const removeFavorite = useFavoritesStore((s) => s.removeFavorite);

  if (items.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <EmptyFavorites />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <AppText size={24} weight="bold" color="#363a33" style={styles.header}>
        Favorites
      </AppText>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <FavoriteItem
            item={item}
            onPress={() => router.push(`/product/${item.id}`)}
            onRemove={() => removeFavorite(item.id)}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 16,
  },
  header: {
    marginTop: 10,
    marginBottom: 16,
  },
  list: {
    gap: 16,
    paddingBottom: 20,
  },
});
