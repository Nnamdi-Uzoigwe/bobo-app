// import AppText from "@/components/AppText";
// import Button from "@/components/Button";
// import Gray from "@/components/gray";
// import { router } from "expo-router";
// import { Image, StyleSheet, Text, View } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";

// export default function StepFour() {
//   return (
//     <SafeAreaView style={styles.container}>
//       {/* app logo */}
//       <Image
//         source={require("@/assets/images/app-logo.png")}
//         // style={styles.logo}
//       />

//       {/* main */}
//       <View style={styles.flexContainer}>
//         <Gray />
//         <Image
//           source={require("@/assets/images/onboarding-4.png")}
//           style={styles.img}
//         />
//         <View style={{ width: "100%", gap: 10 }}>
//             <AppText size={30} color="#363A33" weight="bold" style={styles.align}>Join to get the delicious cuisines!</AppText>
//         </View>
//       </View>

//       <View style={styles.grid}>
//         <View style={{ width: "100%" }}>
//           <Button
//             label="Continue to app"
//             onPress={() => router.replace("/(auth)/login")}
//             />
//         </View>

//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     backgroundColor: "white",
//     justifyContent: "space-evenly",
//     paddingHorizontal: 10,
//   },
//   flexContainer: {
//     justifyContent: "center",
//     alignItems: "center",
//     gap: 10,
//   },
//   img: {
//     zIndex: 1,
//   },
//   largeText: {
//     fontSize: 34,
//     fontWeight: "bold",
//     textAlign: "center",
//   },
//   align: {
//     textAlign: "center",
//   },
//   grid: {
//     width: "100%",
//     gap: 10,
//     flexDirection: "row",
//     justifyContent: "center"
//   }
// });

import AppText from "@/components/AppText";
import Button from "@/components/Button";
import Gray from "@/components/gray";
import { router } from "expo-router";
import { useEffect } from "react";
import { Image, StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const AnimatedImage = Animated.createAnimatedComponent(Image);

export default function StepFour() {
  const imageProgress = useSharedValue(0);
  const titleProgress = useSharedValue(0);
  const footerProgress = useSharedValue(0);

  useEffect(() => {
    imageProgress.value = withTiming(1, {
      duration: 500,
      easing: Easing.out(Easing.cubic),
    });
    titleProgress.value = withDelay(
      200,
      withTiming(1, { duration: 450, easing: Easing.out(Easing.cubic) }),
    );
    footerProgress.value = withDelay(
      400,
      withTiming(1, { duration: 400, easing: Easing.out(Easing.cubic) }),
    );
  }, []);

  const imageStyle = useAnimatedStyle(() => ({
    opacity: imageProgress.value,
    transform: [
      { translateY: (1 - imageProgress.value) * 24 },
      { scale: 0.92 + imageProgress.value * 0.08 },
    ],
  }));

  const titleStyle = useAnimatedStyle(() => ({
    opacity: titleProgress.value,
    transform: [{ translateY: (1 - titleProgress.value) * 16 }],
  }));

  const footerStyle = useAnimatedStyle(() => ({
    opacity: footerProgress.value,
    transform: [{ translateY: (1 - footerProgress.value) * 12 }],
  }));

  return (
    <SafeAreaView style={styles.container}>
      {/* app logo */}
      <Image source={require("@/assets/images/app-logo.png")} />

      {/* main */}
      <View style={styles.flexContainer}>
        <Gray />
        <AnimatedImage
          source={require("@/assets/images/onboarding-4.png")}
          style={[styles.img, imageStyle]}
        />
        <View style={{ width: "100%", gap: 10 }}>
          <Animated.View style={titleStyle}>
            <AppText
              size={30}
              color="#363A33"
              weight="bold"
              style={styles.align}
            >
              Join to get the delicious cuisines!
            </AppText>
          </Animated.View>
        </View>
      </View>

      <Animated.View style={[styles.grid, footerStyle]}>
        <View style={{ width: "100%" }}>
          <Button
            label="Continue to app"
            onPress={() => router.replace("/(auth)/login")}
          />
        </View>
      </Animated.View>
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
  img: { zIndex: 1 },
  largeText: { fontSize: 34, fontWeight: "bold", textAlign: "center" },
  align: { textAlign: "center" },
  grid: {
    width: "100%",
    gap: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
});
