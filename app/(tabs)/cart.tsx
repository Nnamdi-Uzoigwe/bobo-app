// import AppText from "@/components/AppText";
// import CartFooter from "@/components/cart/CartFooter";
// import CartItem from "@/components/cart/CartItem";
// import EmptyCart from "@/components/cart/EmptyCart";
// import { useCartStore } from "@/store/cartStore";
// import { Feather } from "@expo/vector-icons";
// import { router } from "expo-router";
// import { FlatList, StyleSheet, View } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";

// export default function CartScreen() {
//   const items = useCartStore((s) => s.items);
//   const increaseQty = useCartStore((s) => s.increaseQty);
//   const decreaseQty = useCartStore((s) => s.decreaseQty);
//   const removeFromCart = useCartStore((s) => s.removeFromCart);

//   const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

//   if (items.length === 0) {
//     return (
//       <SafeAreaView style={styles.container}>
//         <EmptyCart />
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.header}>
//         <Feather
//           name="shopping-cart"
//           size={24}
//           color="black"
//           style={styles.cartIcon}
//         />
//         <AppText size={24} weight="bold" color="#363a33">
//           Cart
//         </AppText>
//       </View>

//       <FlatList
//         data={items}
//         keyExtractor={(item) => item.id}
//         contentContainerStyle={styles.list}
//         renderItem={({ item }) => (
//           <CartItem
//             item={item}
//             onIncrease={() => increaseQty(item.id)}
//             onDecrease={() => decreaseQty(item.id)}
//             onRemove={() => removeFromCart(item.id)}
//           />
//         )}
//       />

//       <CartFooter
//         totalPrice={totalPrice}
//         onCheckout={() => router.push("/cart/checkout")}
//       />
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "white",
//     paddingHorizontal: 16,
//   },
//   header: {
//     marginTop: 15,
//     marginBottom: 30,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     gap: 10,
//   },
//   list: {
//     gap: 16,
//     paddingBottom: 20,
//   },
//   cartIcon: {
//     transform: [{ rotate: "-20deg" }],
//   },
// });

import AppText from "@/components/AppText";
import CartFooter from "@/components/cart/CartFooter";
import CartItem from "@/components/cart/CartItem";
import EmptyCart from "@/components/cart/EmptyCart";
import { useCartStore } from "@/store/cartStore";
import { useTheme } from "@/theme/ThemeProvider";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { FlatList, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CartScreen() {
  const items = useCartStore((s) => s.items);
  const increaseQty = useCartStore((s) => s.increaseQty);
  const decreaseQty = useCartStore((s) => s.decreaseQty);
  const removeFromCart = useCartStore((s) => s.removeFromCart);
  const { colors } = useTheme();

  const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  if (items.length === 0) {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <EmptyCart />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={styles.header}>
        <Feather
          name="shopping-cart"
          size={24}
          color={colors.text}
          style={styles.cartIcon}
        />
        <AppText size={24} weight="bold" color={colors.text}>
          Cart
        </AppText>
      </View>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <CartItem
            item={item}
            onIncrease={() => increaseQty(item.id)}
            onDecrease={() => decreaseQty(item.id)}
            onRemove={() => removeFromCart(item.id)}
          />
        )}
      />

      <CartFooter
        totalPrice={totalPrice}
        onCheckout={() => router.push("/cart/checkout")}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    marginTop: 15,
    marginBottom: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  list: {
    gap: 16,
    paddingBottom: 20,
  },
  cartIcon: {
    transform: [{ rotate: "-20deg" }],
  },
});
