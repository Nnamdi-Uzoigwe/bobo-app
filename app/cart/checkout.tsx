import AppText from "@/components/AppText";
import Button from "@/components/Button";
import { useCartStore } from "@/store/cartStore";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Checkout() {
  const items = useCartStore((s) => s.items);
  const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const deliveryFee = 2.5;
  const grandTotal = totalPrice + deliveryFee;

  return (
    <SafeAreaView style={styles.container}>
      <AppText size={24} weight="bold" color="#363a33" style={styles.header}>
        Checkout
      </AppText>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Delivery address */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Feather name="map-pin" size={18} color="#5EAD1D" />
            <AppText weight="semibold" size={16} color="#363a33">
              Delivery Address
            </AppText>
          </View>
          <AppText size={14} color="#61685c">
            12 Adeola Odeku Street, Victoria Island, Lagos
          </AppText>
        </View>

        {/* Payment method */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Feather name="credit-card" size={18} color="#5EAD1D" />
            <AppText weight="semibold" size={16} color="#363a33">
              Payment Method
            </AppText>
          </View>
          <AppText size={14} color="#61685c">
            Visa •••• 4242
          </AppText>
        </View>

        {/* Order summary */}
        <View style={styles.section}>
          <AppText
            weight="semibold"
            size={16}
            color="#363a33"
            style={{ marginBottom: 10 }}
          >
            Order Summary
          </AppText>

          {items.map((item) => (
            <View key={item.id} style={styles.summaryRow}>
              <Image source={item.image} style={styles.itemImage} />
              <AppText size={14} color="#363a33" style={{ flex: 1 }}>
                {item.name} x{item.quantity}
              </AppText>
              <AppText size={14} weight="medium" color="#363a33">
                ${(item.price * item.quantity).toFixed(2)}
              </AppText>
            </View>
          ))}
        </View>

        {/* Price breakdown */}
        <View style={styles.section}>
          <View style={styles.priceRow}>
            <AppText size={14} color="#61685c">
              Subtotal
            </AppText>
            <AppText size={14} color="#363a33">
              ${totalPrice.toFixed(2)}
            </AppText>
          </View>
          <View style={styles.priceRow}>
            <AppText size={14} color="#61685c">
              Delivery Fee
            </AppText>
            <AppText size={14} color="#363a33">
              ${deliveryFee.toFixed(2)}
            </AppText>
          </View>
          <View style={[styles.priceRow, styles.totalRow]}>
            <AppText size={16} weight="semibold" color="#363a33">
              Total
            </AppText>
            <AppText size={20} weight="bold" color="#363a33">
              ${grandTotal.toFixed(2)}
            </AppText>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          label="Place Order"
          onPress={() => router.push("/cart/order-placed")}
          style={styles.placeOrderButton}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 16,
  },
  header: {
    marginTop: 10,
    marginBottom: 16,
  },
  scroll: {
    paddingBottom: 20,
    gap: 20,
  },
  section: {
    borderWidth: 1,
    borderColor: "#e2e6df",
    borderRadius: 14,
    padding: 14,
    gap: 8,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 2,
  },
  summaryRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 6,
  },
  itemImage: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: "#F4F7F2",
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: "#e2e6df",
    marginTop: 6,
    paddingTop: 10,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: "#e2e6df",
    paddingVertical: 16,
    paddingBottom: 24,
  },
  placeOrderButton: {
    width: "100%",
  },
});
