import AppText from "@/components/AppText";
import { FavoriteItem as FavoriteItemType } from "@/store/favoritesStore";
import { EvilIcons } from "@expo/vector-icons";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

type Props = {
  item: FavoriteItemType;
  onPress: () => void;
  onRemove: () => void;
};

export default function FavoriteItem({ item, onPress, onRemove }: Props) {
  return (
    <TouchableOpacity style={styles.row} onPress={onPress}>
      <Image source={item.image} style={styles.image} />

      <View style={styles.info}>
        <AppText weight="semibold" size={16} color="#363a33">
          {item.name}
        </AppText>
        <AppText weight="medium" size={15} color="#61685c">
          ${item.price.toFixed(2)}
        </AppText>
      </View>

      <TouchableOpacity onPress={onRemove} style={styles.heartButton}>
        <EvilIcons name="heart" size={28} color="#EF4444" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: "#F4F7F2",
  },
  info: {
    flex: 1,
    gap: 4,
  },
  heartButton: {
    padding: 4,
  },
});
