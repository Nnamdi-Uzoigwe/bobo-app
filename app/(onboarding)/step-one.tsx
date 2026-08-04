import AppText from "@/components/AppText";
import Button from "@/components/Button";
import DotNavigation from "@/components/DotNavigation";
import Gray from "@/components/gray";
import { router } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function StepOne() {
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
          source={require("@/assets/images/onboarding-1.png")}
          style={styles.img}
        />
        <View style={{ width: "100%", gap: 10 }}>
            <AppText size={30} color="#363A33" weight="bold" style={styles.align}>Welcome to the most tastiest app</AppText>
            <AppText weight="medium" style={styles.align} size={17} color="#60655C">
            You know, this app is edible meaning you can eat it
            </AppText>
        </View>
      </View>

      <DotNavigation activeIndex={0} />

      <View style={styles.grid}>
        <View style={{ width: "30%" }}>
          <Button
            label="Skip"
            onPress={() => router.replace("/(onboarding)/step-four")}
            outline
            />
        </View>

        <View style={{ width: "60%" }}>
          <Button
            label="Next"
            onPress={() => router.replace("/(onboarding)/step-two")}
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
