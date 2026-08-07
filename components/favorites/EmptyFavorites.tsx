import AppText from "@/components/AppText";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { Image, StyleSheet, View } from "react-native";
import Button from "../Button";

export default function EmptyFavorites() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Feather
          name="shopping-cart"
          size={24}
          color="black"
          style={styles.cartIcon}
        />
        <AppText size={24} weight="bold" color="#363a33">
          Cart
        </AppText>
      </View>

      <View style={styles.content}>
        <Image source={require("@/assets/images/empty-box.png")} />
        <AppText
          style={styles.mainText}
          size={30}
          weight="bold"
          color="#363a33"
        >
          Nothing found here!
        </AppText>
        <AppText size={17} color="#363a33" style={styles.desc}>
          Explore and add items to the favorites to show here...
        </AppText>
        <Button
          label="Explore"
          onPress={() => router.replace("/(tabs)/explore")}
          style={styles.button}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  header: {
    marginTop: 15,
    marginBottom: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  cartIcon: {
    transform: [{ rotate: "-20deg" }],
  },
  desc: {
    textAlign: "center",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  button: {
    paddingHorizontal: 30,
  },
  mainText: {
    textAlign: "center",
  },
});
