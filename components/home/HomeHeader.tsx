// import { Feather } from "@expo/vector-icons";
// import { router } from "expo-router";
// import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
// import AppText from "../AppText";

// export default function HomeHeader() {
//   const username = "Nnamdi";
//   return (
//     <View style={styles.header}>
//       <View style={styles.textCol}>
//         <AppText color="#8A8F84" size={14} weight="medium">
//           Hi {username} 👋
//         </AppText>
//         <AppText color="#363a33" size={18} weight="bold">
//           What are you craving?
//         </AppText>
//       </View>

//       <View style={styles.avatarContainer}>
//         <TouchableOpacity onPress={() => router.push("/notifications")}>
//           <Feather name="bell" size={24} color="#565c51" />
//         </TouchableOpacity>

//         <Image
//           source={require("@/assets/images/avatar.png")}
//           style={styles.avatar}
//         />
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
//   textCol: {
//     gap: 4,
//   },
//   avatar: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     borderWidth: 2,
//     borderColor: "#ECF1E8",
//   },
//   avatarContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 20,
//   },
// });

import { useAuthStore } from "@/store/authStore";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import AppText from "../AppText";

function getFirstName(fullName?: string): string {
  if (!fullName) return "there";
  return fullName.trim().split(/\s+/)[0];
}

function getInitials(fullName?: string): string {
  if (!fullName) return "U";
  const parts = fullName.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return parts[0].slice(0, 2).toUpperCase();
}

export default function HomeHeader() {
  const user = useAuthStore((s) => s.user);
  const firstName = getFirstName(user?.fullName);
  const initials = getInitials(user?.fullName);

  return (
    <View style={styles.header}>
      <View style={styles.textCol}>
        <AppText color="#8A8F84" size={14} weight="medium">
          Hi {firstName} 👋
        </AppText>
        <AppText color="#363a33" size={18} weight="bold">
          What are you craving?
        </AppText>
      </View>

      <View style={styles.avatarContainer}>
        <TouchableOpacity onPress={() => router.push("/notifications")}>
          <Feather name="bell" size={24} color="#565c51" />
        </TouchableOpacity>

        <View style={styles.avatar}>
          <AppText color="#FFFFFF" size={14} weight="bold">
            {initials}
          </AppText>
        </View>
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
    backgroundColor: "#2F5233",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
});
