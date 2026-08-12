// import AppText from "@/components/AppText";
// import Button from "@/components/Button";
// import { AntDesign, Feather } from "@expo/vector-icons";
// import { router, useLocalSearchParams } from "expo-router";
// import { useEffect, useRef } from "react";
// import { Animated, StyleSheet, TouchableOpacity, View } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";

// export default function OrderPlacedScreen() {
//   const { total } = useLocalSearchParams<{ total: string }>();

//   const checkScale = useRef(new Animated.Value(0)).current;
//   const textOpacity = useRef(new Animated.Value(0)).current;
//   const textTranslateY = useRef(new Animated.Value(12)).current;

//   useEffect(() => {
//     Animated.sequence([
//       Animated.spring(checkScale, {
//         toValue: 1,
//         friction: 4,
//         tension: 120,
//         useNativeDriver: true,
//       }),
//       Animated.parallel([
//         Animated.timing(textOpacity, {
//           toValue: 1,
//           duration: 350,
//           useNativeDriver: true,
//         }),
//         Animated.spring(textTranslateY, {
//           toValue: 0,
//           friction: 6,
//           tension: 80,
//           useNativeDriver: true,
//         }),
//       ]),
//     ]).start();
//   }, []);

//   return (
//     <SafeAreaView style={styles.container}>
//       <TouchableOpacity
//         onPress={() => router.back()}
//         style={styles.closeButton}
//       >
//         <AntDesign name="close" size={22} color="#363a33" />
//       </TouchableOpacity>

//       <View style={styles.content}>
//         <Animated.View
//           style={[styles.checkCircle, { transform: [{ scale: checkScale }] }]}
//         >
//           <AntDesign name="check" size={32} color="white" />
//         </Animated.View>

//         <Animated.View
//           style={{
//             opacity: textOpacity,
//             transform: [{ translateY: textTranslateY }],
//             alignItems: "center",
//           }}
//         >
//           <AppText size={22} weight="bold" color="#363a33" style={styles.align}>
//             Yay! Your order{"\n"}has been placed.
//           </AppText>

//           <AppText
//             size={14}
//             color="#61685c"
//             style={[styles.align, styles.subtitle]}
//           >
//             Your order would be delivered in the{"\n"}30 mins atmost
//           </AppText>
//         </Animated.View>

//         <View style={styles.details}>
//           <View style={styles.detailRow}>
//             <View style={styles.detailLeft}>
//               <Feather name="clock" size={16} color="#61685c" />
//               <AppText size={14} color="#61685c">
//                 Estimated time
//               </AppText>
//             </View>
//             <AppText size={14} weight="medium" color="#363a33">
//               30mins
//             </AppText>
//           </View>

//           <View style={styles.detailRow}>
//             <View style={styles.detailLeft}>
//               <Feather name="map-pin" size={16} color="#61685c" />
//               <AppText size={14} color="#61685c">
//                 Deliver to
//               </AppText>
//             </View>
//             <AppText size={14} weight="medium" color="#363a33">
//               Home
//             </AppText>
//           </View>

//           <View style={styles.detailRow}>
//             <View style={styles.detailLeft}>
//               <Feather name="credit-card" size={16} color="#61685c" />
//               <AppText size={14} color="#61685c">
//                 Amount Paid
//               </AppText>
//             </View>
//             <AppText size={14} weight="medium" color="#363a33">
//               ${total ?? "0.00"}
//             </AppText>
//           </View>
//         </View>
//       </View>

//       <View style={styles.footer}>
//         <Button
//           label="View my order"
//           onPress={() => router.replace("/profile")}
//           style={styles.trackButton}
//         />
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "white",
//     paddingHorizontal: 16,
//   },
//   closeButton: {
//     marginTop: 10,
//     width: 32,
//     height: 32,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   content: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     gap: 24,
//   },
//   checkCircle: {
//     width: 64,
//     height: 64,
//     borderRadius: 32,
//     backgroundColor: "#5EAD1D",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   align: {
//     textAlign: "center",
//   },
//   subtitle: {
//     marginTop: 8,
//   },
//   details: {
//     width: "100%",
//     gap: 12,
//     marginTop: 8,
//   },
//   detailRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   detailLeft: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 8,
//   },
//   footer: {
//     paddingVertical: 16,
//     paddingBottom: 24,
//   },
//   trackButton: {
//     width: "100%",
//   },
// });

import AppText from "@/components/AppText";
import Button from "@/components/Button";
import { useTheme } from "@/theme/ThemeProvider";
import { AntDesign, Feather } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useRef } from "react";
import { Animated, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OrderPlacedScreen() {
  const { total } = useLocalSearchParams<{ total: string }>();
  const { colors } = useTheme();

  const checkScale = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const textTranslateY = useRef(new Animated.Value(12)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.spring(checkScale, {
        toValue: 1,
        friction: 4,
        tension: 120,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 350,
          useNativeDriver: true,
        }),
        Animated.spring(textTranslateY, {
          toValue: 0,
          friction: 6,
          tension: 80,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <TouchableOpacity
        onPress={() => router.back()}
        style={styles.closeButton}
      >
        <AntDesign name="close" size={22} color={colors.text} />
      </TouchableOpacity>

      <View style={styles.content}>
        <Animated.View
          style={[
            styles.checkCircle,
            {
              backgroundColor: colors.primary,
              transform: [{ scale: checkScale }],
            },
          ]}
        >
          <AntDesign name="check" size={32} color="white" />
        </Animated.View>

        <Animated.View
          style={{
            opacity: textOpacity,
            transform: [{ translateY: textTranslateY }],
            alignItems: "center",
          }}
        >
          <AppText
            size={22}
            weight="bold"
            color={colors.text}
            style={styles.align}
          >
            Yay! Your order{"\n"}has been placed.
          </AppText>

          <AppText
            size={14}
            color={colors.textMuted}
            style={[styles.align, styles.subtitle]}
          >
            Your order would be delivered in the{"\n"}30 mins atmost
          </AppText>
        </Animated.View>

        <View style={styles.details}>
          <View style={styles.detailRow}>
            <View style={styles.detailLeft}>
              <Feather name="clock" size={16} color={colors.textMuted} />
              <AppText size={14} color={colors.textMuted}>
                Estimated time
              </AppText>
            </View>
            <AppText size={14} weight="medium" color={colors.text}>
              30mins
            </AppText>
          </View>

          <View style={styles.detailRow}>
            <View style={styles.detailLeft}>
              <Feather name="map-pin" size={16} color={colors.textMuted} />
              <AppText size={14} color={colors.textMuted}>
                Deliver to
              </AppText>
            </View>
            <AppText size={14} weight="medium" color={colors.text}>
              Home
            </AppText>
          </View>

          <View style={styles.detailRow}>
            <View style={styles.detailLeft}>
              <Feather name="credit-card" size={16} color={colors.textMuted} />
              <AppText size={14} color={colors.textMuted}>
                Amount Paid
              </AppText>
            </View>
            <AppText size={14} weight="medium" color={colors.text}>
              ${total ?? "0.00"}
            </AppText>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <Button
          label="View my order"
          onPress={() => router.replace("/profile")}
          style={styles.trackButton}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  closeButton: {
    marginTop: 10,
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 24,
  },
  checkCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  align: {
    textAlign: "center",
  },
  subtitle: {
    marginTop: 8,
  },
  details: {
    width: "100%",
    gap: 12,
    marginTop: 8,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  detailLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  footer: {
    paddingVertical: 16,
    paddingBottom: 24,
  },
  trackButton: {
    width: "100%",
  },
});
