// import AppText from "@/components/AppText";
// import { Feather } from "@expo/vector-icons";
// import {
//   Image,
//   ImageSourcePropType,
//   Pressable,
//   StyleSheet,
//   View,
// } from "react-native";

// export type Order = {
//   id: string;
//   statusLabel: string;
//   estDelivery: string;
//   summary: string;
//   extraItemsCount?: number;
//   total: number;
//   image: ImageSourcePropType;
//   thumbnail?: ImageSourcePropType;
// };

// type OrderCardProps = {
//   order: Order;
//   onTrackPress?: () => void;
//   onMenuPress?: () => void;
// };

// export default function OrderCard({
//   order,
//   onTrackPress,
//   onMenuPress,
// }: OrderCardProps) {
//   return (
//     <View style={styles.card}>
//       <View style={styles.topRow}>
//         <View style={styles.imagesCol}>
//           <Image source={order.image} style={styles.mainImage} />
//           {order.thumbnail && (
//             <View style={styles.thumbWrap}>
//               <Image source={order.thumbnail} style={styles.thumbImage} />
//               {!!order.extraItemsCount && (
//                 <View style={styles.extraBadge}>
//                   <AppText size={11} weight="semibold" color="#1F2937">
//                     +{order.extraItemsCount}
//                   </AppText>
//                 </View>
//               )}
//             </View>
//           )}
//         </View>

//         <View style={styles.infoCol}>
//           <AppText size={16} weight="bold" color="#1F2937">
//             {order.statusLabel}
//           </AppText>

//           <View style={styles.infoRow}>
//             <AppText size={13} color="#9CA3AF">
//               Est. delivery
//             </AppText>
//             <AppText size={13} weight="semibold" color="#1F2937">
//               {order.estDelivery}
//             </AppText>
//           </View>

//           <View style={styles.infoRow}>
//             <AppText size={13} color="#9CA3AF">
//               Order summary
//             </AppText>
//             <AppText
//               size={13}
//               weight="semibold"
//               color="#1F2937"
//               numberOfLines={1}
//               style={styles.summaryText}
//             >
//               {order.summary}
//             </AppText>
//           </View>

//           <View style={styles.infoRow}>
//             <AppText size={13} color="#9CA3AF">
//               Total price paid
//             </AppText>
//             <AppText size={13} weight="semibold" color="#1F2937">
//               ${order.total.toFixed(2)}
//             </AppText>
//           </View>
//         </View>
//       </View>

//       <View style={styles.actionRow}>
//         <Pressable style={styles.trackButton} onPress={onTrackPress}>
//           <AppText size={15} weight="semibold" color="#1F2937">
//             Track order
//           </AppText>
//         </Pressable>

//         <Pressable style={styles.menuButton} onPress={onMenuPress}>
//           <Feather name="more-vertical" size={18} color="#1F2937" />
//         </Pressable>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   card: {
//     borderWidth: 1,
//     borderColor: "#E2E6DF",
//     borderRadius: 16,
//     padding: 14,
//     gap: 14,
//   },
//   topRow: { flexDirection: "row", gap: 12 },
//   imagesCol: { width: 60 },
//   mainImage: { width: 60, height: 60, borderRadius: 12 },
//   thumbWrap: { marginTop: 6, position: "relative" },
//   thumbImage: { width: 60, height: 34, borderRadius: 10 },
//   extraBadge: {
//     position: "absolute",
//     right: 4,
//     top: 6,
//     backgroundColor: "#F1F3EE",
//     borderRadius: 10,
//     paddingHorizontal: 6,
//     paddingVertical: 2,
//   },
//   infoCol: { flex: 1, gap: 6 },
//   infoRow: { flexDirection: "row", justifyContent: "space-between", gap: 8 },
//   summaryText: { flexShrink: 1, textAlign: "right" },
//   actionRow: { flexDirection: "row", gap: 10 },
//   trackButton: {
//     flex: 1,
//     height: 46,
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: "#E2E6DF",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   menuButton: {
//     width: 46,
//     height: 46,
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: "#E2E6DF",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });

import AppText from "@/components/AppText";
import { useTheme } from "@/theme/ThemeProvider";
import { Feather } from "@expo/vector-icons";
import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  View,
} from "react-native";

export type Order = {
  id: string;
  statusLabel: string;
  estDelivery: string;
  summary: string;
  extraItemsCount?: number;
  total: number;
  image: ImageSourcePropType;
  thumbnail?: ImageSourcePropType;
};

type OrderCardProps = {
  order: Order;
  onTrackPress?: () => void;
  onMenuPress?: () => void;
};

export default function OrderCard({
  order,
  onTrackPress,
  onMenuPress,
}: OrderCardProps) {
  const { colors } = useTheme();

  return (
    <View style={[styles.card, { borderColor: colors.border }]}>
      <View style={styles.topRow}>
        <View style={styles.imagesCol}>
          <Image source={order.image} style={styles.mainImage} />
          {order.thumbnail && (
            <View style={styles.thumbWrap}>
              <Image source={order.thumbnail} style={styles.thumbImage} />
              {!!order.extraItemsCount && (
                <View
                  style={[
                    styles.extraBadge,
                    { backgroundColor: colors.surface },
                  ]}
                >
                  <AppText size={11} weight="semibold" color={colors.text}>
                    +{order.extraItemsCount}
                  </AppText>
                </View>
              )}
            </View>
          )}
        </View>

        <View style={styles.infoCol}>
          <AppText size={16} weight="bold" color={colors.text}>
            {order.statusLabel}
          </AppText>

          <View style={styles.infoRow}>
            <AppText size={13} color={colors.textFaint}>
              Est. delivery
            </AppText>
            <AppText size={13} weight="semibold" color={colors.text}>
              {order.estDelivery}
            </AppText>
          </View>

          <View style={styles.infoRow}>
            <AppText size={13} color={colors.textFaint}>
              Order summary
            </AppText>
            <AppText
              size={13}
              weight="semibold"
              color={colors.text}
              numberOfLines={1}
              style={styles.summaryText}
            >
              {order.summary}
            </AppText>
          </View>

          <View style={styles.infoRow}>
            <AppText size={13} color={colors.textFaint}>
              Total price paid
            </AppText>
            <AppText size={13} weight="semibold" color={colors.text}>
              ${order.total.toFixed(2)}
            </AppText>
          </View>
        </View>
      </View>

      <View style={styles.actionRow}>
        <Pressable
          style={[styles.trackButton, { borderColor: colors.border }]}
          onPress={onTrackPress}
        >
          <AppText size={15} weight="semibold" color={colors.text}>
            Track order
          </AppText>
        </Pressable>

        <Pressable
          style={[styles.menuButton, { borderColor: colors.border }]}
          onPress={onMenuPress}
        >
          <Feather name="more-vertical" size={18} color={colors.text} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 14,
    gap: 14,
  },
  topRow: { flexDirection: "row", gap: 12 },
  imagesCol: { width: 60 },
  mainImage: { width: 60, height: 60, borderRadius: 12 },
  thumbWrap: { marginTop: 6, position: "relative" },
  thumbImage: { width: 60, height: 34, borderRadius: 10 },
  extraBadge: {
    position: "absolute",
    right: 4,
    top: 6,
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  infoCol: { flex: 1, gap: 6 },
  infoRow: { flexDirection: "row", justifyContent: "space-between", gap: 8 },
  summaryText: { flexShrink: 1, textAlign: "right" },
  actionRow: { flexDirection: "row", gap: 10 },
  trackButton: {
    flex: 1,
    height: 46,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  menuButton: {
    width: 46,
    height: 46,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
