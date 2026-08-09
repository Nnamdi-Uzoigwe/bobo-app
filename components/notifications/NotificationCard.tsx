// import { MaterialCommunityIcons } from "@expo/vector-icons";
// import { StyleSheet, View } from "react-native";
// import AppText from "../AppText";

// export type NotificationItem = {
//   id: string;
//   title: string;
//   message: string;
//   time: string;
// };

// export default function NotificationCard({
//   title,
//   message,
//   time,
// }: NotificationItem) {
//   return (
//     <View style={styles.card}>
//       <View style={styles.iconWrapper}>
//         <MaterialCommunityIcons name="hamburger" size={22} color="#5EAD1D" />
//       </View>

//       <View style={styles.textCol}>
//         <AppText size={15} weight="semibold" color="#1F2937">
//           {title}
//         </AppText>
//         <AppText size={13} color="#6B7280" style={styles.message}>
//           {message}
//         </AppText>
//         <AppText size={12} weight="semibold" color="#9CA3AF">
//           {time}
//         </AppText>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   card: {
//     flexDirection: "row",
//     gap: 12,
//   },
//   iconWrapper: {
//     width: 44,
//     height: 44,
//     borderRadius: 22,
//     backgroundColor: "#ECF1E8",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   textCol: {
//     flex: 1,
//     gap: 4,
//   },
//   message: {
//     lineHeight: 18,
//   },
// });

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet, View } from "react-native";
import AppText from "../AppText";

export type NotificationItem = {
  id: string;
  title: string;
  message: string;
  time: string;
};

type NotificationCardProps = NotificationItem & {
  onPress?: () => void;
};

export default function NotificationCard({
  title,
  message,
  time,
  onPress,
}: NotificationCardProps) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.iconWrapper}>
        <MaterialCommunityIcons name="hamburger" size={22} color="#5EAD1D" />
      </View>

      <View style={styles.textCol}>
        <AppText size={15} weight="semibold" color="#1F2937">
          {title}
        </AppText>
        <AppText size={13} color="#6B7280" style={styles.message}>
          {message}
        </AppText>
        <AppText size={12} weight="semibold" color="#9CA3AF">
          {time}
        </AppText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    gap: 12,
  },
  iconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#ECF1E8",
    alignItems: "center",
    justifyContent: "center",
  },
  textCol: {
    flex: 1,
    gap: 4,
  },
  message: {
    lineHeight: 18,
  },
});
