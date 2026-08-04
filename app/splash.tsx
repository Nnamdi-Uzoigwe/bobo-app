import { Image } from "expo-image";
import { router } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";

export default function SplashScreen() {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/(onboarding)/step-one");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/splash-icon.png")}
        style={styles.logo}
        contentFit="cover"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});