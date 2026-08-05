import EvilIcons from "@expo/vector-icons/EvilIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import AppText from "../AppText";

export default function DetailHeader() {
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

        <TouchableOpacity>
          <EvilIcons name="heart" size={30} color="black" />
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
  },
});
