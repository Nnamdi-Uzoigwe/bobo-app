import type { FoodItem } from "@/data/foodData";
import { useCartStore } from "@/store/cartStore";
import { Feather } from "@expo/vector-icons";
import { Image, Pressable, StyleSheet, View } from "react-native";
import AppText from "../AppText";

type MenuCardProps = {
  item: FoodItem;
  onPress?: (item: FoodItem) => void;
  onAddPress?: (item: FoodItem) => void;
};

export default function MenuCard({ item, onPress, onAddPress }: MenuCardProps) {
  const addToCart = useCartStore((s) => s.addToCart);
  const { id, name, image, price } = item;
  const quantity = 1;
  const handleAddToCart = () => {
    addToCart({ id, name, image, price }, quantity);
  };
  return (
    <Pressable style={styles.card} onPress={() => onPress?.(item)}>
      <View style={styles.imageWrapper}>
        <Image source={item.image} style={styles.image} />
        <View style={styles.ratingBadge}>
          <Feather name="star" size={12} color="#F5A623" />
          <AppText size={12} weight="semibold" color="#363a33">
            {item.rating.toFixed(1)}
          </AppText>
        </View>
      </View>

      <View style={styles.infoRow}>
        <View style={styles.textCol}>
          <AppText
            size={15}
            weight="semibold"
            color="#1F2937"
            numberOfLines={1}
          >
            {item.name}
          </AppText>
          <AppText size={14} weight="semibold" color="#363a33">
            ${item.price.toFixed(2)}
          </AppText>
        </View>

        <Pressable style={styles.addButton} onPress={handleAddToCart}>
          <Feather name="plus" size={18} color="#5EAD1D" />
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    overflow: "hidden",
  },
  imageWrapper: {
    position: "relative",
  },
  image: {
    width: "100%",
    height: 130,
    borderRadius: 16,
    resizeMode: "cover",
  },
  ratingBadge: {
    position: "absolute",
    left: 8,
    bottom: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 10,
    paddingHorizontal: 2,
  },
  textCol: {
    flex: 1,
    gap: 4,
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#ECF1E8",
    alignItems: "center",
    justifyContent: "center",
  },
});
