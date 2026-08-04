// import { Image, StyleSheet, View } from "react-native";
// import AppText from "../AppText";

// export default function HomeHeader() {
//   const username = "Nnamdi";
//   return (
//     <View style={styles.header}>
//       <View>
//         <AppText color="#363a33" size={16} weight="semibold">
//           Hi <AppText color="#5EAD1D">{username}</AppText>
//         </AppText>
//         <AppText color="#363a33" size={18}>
//           What are you craving?
//         </AppText>
//       </View>

//       {/* Avatar */}
//       <View>
//         <Image source={require("@/assets/images/avatar.png")} />
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginTop: 15,
//   },
// });

import { Image, StyleSheet, View } from "react-native";
import AppText from "../AppText";

export default function HomeHeader() {
  const username = "Nnamdi";
  return (
    <View style={styles.header}>
      <View style={styles.textCol}>
        <AppText color="#8A8F84" size={14} weight="medium">
          Hi {username} 👋
        </AppText>
        <AppText color="#363a33" size={20} weight="bold">
          What are you craving?
        </AppText>
      </View>

      <Image
        source={require("@/assets/images/avatar.png")}
        style={styles.avatar}
      />
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
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: "#ECF1E8",
  },
});
