import { useFavoritesStore } from "@/store/favoritesStore";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import {
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import AppText from "../AppText";

type Props = {
  id: string;
  name: string;
  image: ImageSourcePropType;
  price: number;
};

export default function DetailHeader({ id, name, image, price }: Props) {
  const toggleFavorite = useFavoritesStore((s) => s.toggleFavorite);
  const isFavorited = useFavoritesStore((s) => s.isFavorited(id));

  return (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={() => router.back()}
        style={styles.flexContainer}
      >
        <MaterialIcons name="arrow-back-ios-new" size={24} color="black" />
        <AppText color="#363a33" weight="bold">
          Back
        </AppText>
      </TouchableOpacity>

      <View style={styles.flex}>
        <TouchableOpacity>
          <Ionicons name="share-outline" size={24} color="black" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => toggleFavorite({ id, name, image, price })}
        >
          <Ionicons
            name={isFavorited ? "heart" : "heart-outline"}
            size={28}
            color={isFavorited ? "#EF4444" : "black"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  flexContainer: {
    flexDirection: "row",
    gap: 2,
    alignItems: "center",
  },
  flex: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
    paddingRight: 10,
  },
});
