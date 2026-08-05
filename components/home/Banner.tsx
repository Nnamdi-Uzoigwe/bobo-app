// import { Image, StyleSheet, View } from "react-native";
// import AppText from "../AppText";
// import DarkGray from "./DarkGray";

// export default function Banner() {
//   return (
//     <View style={styles.bannerCard}>
//       {/* main */}
//       <View>
//         <AppText color="#363a33" size={30} weight="bold">
//           35% OFF on Burgers!
//         </AppText>
//         {/* <Button label="Buy Now" onPress={() => {}} /> */}
//       </View>

//       <View style={{ flex: 1 }}>
//         <DarkGray />
//         <Image
//           source={require("@/assets/images/onboarding-4.png")}
//           style={styles.img}
//         />
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   bannerCard: {
//     backgroundColor: "#d8e6cd",
//     height: 200,
//     width: "100%",
//     borderRadius: 14,
//     flexDirection: "row",
//     // justifyContent: "space-evenly",
//     alignItems: "center",
//     padding: 20,
//   },
//   img: {
//     height: 230,
//     width: 180,
//   },
// });

import { Image, StyleSheet, View } from "react-native";
import AppText from "../AppText";
import Button from "../Button";
import DarkGray from "./DarkGray";

export default function Banner() {
  return (
    <View style={styles.bannerCard}>
      {/* main */}
      <View style={styles.textContainer}>
        <AppText
          style={{ lineHeight: 34 }}
          color="#363a33"
          size={30}
          weight="bold"
        >
          35% OFF on Burgers!
        </AppText>
        <Button label="Buy Now" onPress={() => {}} style={{ width: 120 }} />
      </View>

      <View style={styles.imageContainer}>
        <DarkGray />
        <Image
          source={require("@/assets/images/onboarding-4.png")}
          style={styles.img}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bannerCard: {
    backgroundColor: "#d8e6cd",
    height: 200,
    width: "100%",
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    overflow: "hidden",
  },
  textContainer: {
    flex: 1,
    gap: 6,
  },
  imageContainer: {
    width: 140,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    height: 200,
    width: 140,
    resizeMode: "cover",
  },
});
