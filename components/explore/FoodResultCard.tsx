// import AppText from "@/components/AppText";
// import { FoodItem } from "@/data/foodData";
// import { AntDesign, Feather } from "@expo/vector-icons";
// import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

// type Props = {
//   item: FoodItem;
//   discountLabel?: string;
//   onPress: () => void;
//   onAdd: () => void;
// };

// export default function FoodResultCard({
//   item,
//   discountLabel,
//   onPress,
//   onAdd,
// }: Props) {
//   return (
//     <TouchableOpacity
//       style={styles.card}
//       onPress={onPress}
//       activeOpacity={0.85}
//     >
//       <View>
//         <Image source={item.image} style={styles.image} />
//         <View style={styles.ratingBadge}>
//           <AntDesign name="star" size={12} color="orange" />
//           <AppText size={12} weight="semibold" color="#363a33">
//             {item.rating}
//           </AppText>
//         </View>
//       </View>

//       <View style={styles.info}>
//         <AppText weight="semibold" size={16} color="#363a33">
//           {item.name}
//         </AppText>

//         <View style={styles.priceRow}>
//           <AppText weight="bold" size={15} color="#363a33">
//             ${item.price.toFixed(2)}
//           </AppText>

//           {discountLabel && (
//             <View style={styles.discountBadge}>
//               <AppText size={11} weight="medium" color="#61685c">
//                 {discountLabel}
//               </AppText>
//             </View>
//           )}
//         </View>
//       </View>

//       <TouchableOpacity onPress={onAdd} style={styles.addButton}>
//         <Feather name="plus" size={18} color="#5EAD1D" />
//       </TouchableOpacity>
//     </TouchableOpacity>
//   );
// }

// const styles = StyleSheet.create({
//   card: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 14,
//     paddingVertical: 10,
//   },
//   image: {
//     width: 72,
//     height: 72,
//     borderRadius: 16,
//     backgroundColor: "#F4F7F2",
//   },
//   ratingBadge: {
//     position: "absolute",
//     top: 4,
//     left: 4,
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 3,
//     backgroundColor: "white",
//     borderRadius: 8,
//     paddingHorizontal: 5,
//     paddingVertical: 2,
//   },
//   info: { flex: 1, gap: 6 },
//   priceRow: { flexDirection: "row", alignItems: "center", gap: 8 },
//   discountBadge: {
//     backgroundColor: "#F4F7F2",
//     borderRadius: 8,
//     paddingHorizontal: 6,
//     paddingVertical: 2,
//   },
//   addButton: {
//     width: 36,
//     height: 36,
//     borderRadius: 18,
//     backgroundColor: "#ECF1E8",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });

import AppText from "@/components/AppText";
import type { MenuItem } from "@/store/menuStore";
import { AntDesign, Feather } from "@expo/vector-icons";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

type Props = {
  item: MenuItem;
  discountLabel?: string;
  onPress: () => void;
  onAdd: () => void;
};

export default function FoodResultCard({
  item,
  discountLabel,
  onPress,
  onAdd,
}: Props) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <View>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.ratingBadge}>
          <AntDesign name="star" size={12} color="orange" />
          <AppText size={12} weight="semibold" color="#363a33">
            {item.rating}
          </AppText>
        </View>
      </View>

      <View style={styles.info}>
        <AppText weight="semibold" size={16} color="#363a33">
          {item.name}
        </AppText>

        <View style={styles.priceRow}>
          <AppText weight="bold" size={15} color="#363a33">
            ${item.price.toFixed(2)}
          </AppText>

          {discountLabel && (
            <View style={styles.discountBadge}>
              <AppText size={11} weight="medium" color="#61685c">
                {discountLabel}
              </AppText>
            </View>
          )}
        </View>
      </View>

      <TouchableOpacity onPress={onAdd} style={styles.addButton}>
        <Feather name="plus" size={18} color="#5EAD1D" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingVertical: 10,
  },
  image: {
    width: 72,
    height: 72,
    borderRadius: 16,
    backgroundColor: "#F4F7F2",
  },
  ratingBadge: {
    position: "absolute",
    top: 4,
    left: 4,
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    backgroundColor: "white",
    borderRadius: 8,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  info: { flex: 1, gap: 6 },
  priceRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  discountBadge: {
    backgroundColor: "#F4F7F2",
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  addButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#ECF1E8",
    alignItems: "center",
    justifyContent: "center",
  },
});
