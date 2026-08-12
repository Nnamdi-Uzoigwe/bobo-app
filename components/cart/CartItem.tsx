// import AppText from "@/components/AppText";
// import { CartItem as CartItemType } from "@/store/cartStore";
// import { AntDesign } from "@expo/vector-icons";
// import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

// type Props = {
//   item: CartItemType;
//   onIncrease: () => void;
//   onDecrease: () => void;
//   onRemove: () => void;
// };

// export default function CartItem({
//   item,
//   onIncrease,
//   onDecrease,
//   onRemove,
// }: Props) {
//   return (
//     <View style={styles.row}>
//       <Image source={item.image} style={styles.image} />

//       <View style={styles.info}>
//         <AppText weight="semibold" size={16} color="#363a33">
//           {item.name}
//         </AppText>
//         <AppText weight="medium" size={15} color="#61685c">
//           ${item.price.toFixed(2)}
//         </AppText>
//       </View>

//       <View style={styles.counter}>
//         <TouchableOpacity onPress={onDecrease} style={styles.counterButton}>
//           <AntDesign name="minus" size={16} color="black" />
//         </TouchableOpacity>

//         <AppText size={16} weight="semibold">
//           {item.quantity}
//         </AppText>

//         <TouchableOpacity onPress={onIncrease} style={styles.counterButton}>
//           <AntDesign name="plus" size={16} color="black" />
//         </TouchableOpacity>
//       </View>

//       <TouchableOpacity onPress={onRemove} style={styles.removeButton}>
//         <AntDesign name="close" size={16} color="#a6af9f" />
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   row: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 12,
//     borderWidth: 1,
//     borderColor: "#f0f3ed",
//     padding: 6,
//     borderRadius: 10,
//   },
//   image: {
//     width: 60,
//     height: 60,
//     borderRadius: 12,
//     backgroundColor: "#F4F7F2",
//   },
//   info: {
//     flex: 1,
//     gap: 4,
//   },
//   counter: {
//     backgroundColor: "white",
//     borderWidth: 1,
//     borderColor: "#e2e6df",
//     padding: 4,
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 8,
//     borderRadius: 30,
//   },
//   counterButton: {
//     backgroundColor: "#F4F7F2",
//     justifyContent: "center",
//     alignItems: "center",
//     height: 28,
//     width: 28,
//     borderRadius: 14,
//   },
//   removeButton: {
//     padding: 4,
//   },
// });

import AppText from "@/components/AppText";
import { CartItem as CartItemType } from "@/store/cartStore";
import { useTheme } from "@/theme/ThemeProvider";
import { AntDesign } from "@expo/vector-icons";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

type Props = {
  item: CartItemType;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
};

export default function CartItem({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}: Props) {
  const { colors } = useTheme();

  return (
    <View style={[styles.row, { borderColor: colors.border }]}>
      <Image
        source={item.image}
        style={[styles.image, { backgroundColor: colors.surface }]}
      />

      <View style={styles.info}>
        <AppText weight="semibold" size={16} color={colors.text}>
          {item.name}
        </AppText>
        <AppText weight="medium" size={15} color={colors.textMuted}>
          ${item.price.toFixed(2)}
        </AppText>
      </View>

      <View
        style={[
          styles.counter,
          { backgroundColor: colors.card, borderColor: colors.border },
        ]}
      >
        <TouchableOpacity
          onPress={onDecrease}
          style={[styles.counterButton, { backgroundColor: colors.surface }]}
        >
          <AntDesign name="minus" size={16} color={colors.text} />
        </TouchableOpacity>

        <AppText size={16} weight="semibold" color={colors.text}>
          {item.quantity}
        </AppText>

        <TouchableOpacity
          onPress={onIncrease}
          style={[styles.counterButton, { backgroundColor: colors.surface }]}
        >
          <AntDesign name="plus" size={16} color={colors.text} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={onRemove} style={styles.removeButton}>
        <AntDesign name="close" size={16} color={colors.textFaint} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderWidth: 1,
    padding: 6,
    borderRadius: 10,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 12,
  },
  info: {
    flex: 1,
    gap: 4,
  },
  counter: {
    borderWidth: 1,
    padding: 4,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderRadius: 30,
  },
  counterButton: {
    justifyContent: "center",
    alignItems: "center",
    height: 28,
    width: 28,
    borderRadius: 14,
  },
  removeButton: {
    padding: 4,
  },
});
