import { useAuthStore } from "@/store/authStore";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";

export default function SplashScreen() {
  const token = useAuthStore((s) => s.token);
  const user = useAuthStore((s) => s.user);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (token) {
        if (!user?.fullName) {
          router.replace("/(auth)/create-profile");
        } else {
          router.replace("/(tabs)/home");
        }
      } else {
        router.replace("/(onboarding)/step-one");
      }
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
