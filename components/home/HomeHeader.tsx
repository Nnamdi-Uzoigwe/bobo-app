import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import AppText from "../AppText";

export default function HomeHeader() {
  const username = "Nnamdi";
  return (
    <View style={styles.header}>
      <View style={styles.textCol}>
        <AppText color="#8A8F84" size={14} weight="medium">
          Hi {username} 👋
        </AppText>
        <AppText color="#363a33" size={18} weight="bold">
          What are you craving?
        </AppText>
      </View>

      <View style={styles.avatarContainer}>
        <TouchableOpacity onPress={() => router.push("/notifications")}>
          <Feather name="bell" size={24} color="#565c51" />
        </TouchableOpacity>

        <Image
          source={require("@/assets/images/avatar.png")}
          style={styles.avatar}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
  },
  textCol: {
    gap: 4,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#ECF1E8",
  },
  avatarContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
});
