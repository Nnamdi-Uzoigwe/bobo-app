import AppText from "@/components/AppText";
import Button from "@/components/Button";
import Gray from "@/components/gray";
import { router } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function StepFour() {
  return (
    <SafeAreaView style={styles.container}>
      {/* app logo */}
      <Image
        source={require("@/assets/images/app-logo.png")}
        // style={styles.logo}
      />

      {/* main */}
      <View style={styles.flexContainer}>
        <Gray />
        <Image
          source={require("@/assets/images/onboarding-4.png")}
          style={styles.img}
        />
        <View style={{ width: "100%", gap: 10 }}>
            <AppText size={30} color="#363A33" weight="bold" style={styles.align}>Join to get the delicious cuisines!</AppText>
        </View>
      </View>

      <View style={styles.grid}>
        <View style={{ width: "100%" }}>
          <Button
            label="Continue to app"
            onPress={() => router.replace("/(auth)/login")}
            />
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
    justifyContent: "space-evenly",
    paddingHorizontal: 10,
  },
  flexContainer: {
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  img: {
    zIndex: 1,
  },
  largeText: {
    fontSize: 34,
    fontWeight: "bold",
    textAlign: "center",
  },
  align: {
    textAlign: "center",
  },
  grid: {
    width: "100%",
    gap: 10,
    flexDirection: "row",
    justifyContent: "center"
  }
});
