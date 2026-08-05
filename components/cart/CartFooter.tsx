import AppText from "@/components/AppText";
import Button from "@/components/Button";
import { StyleSheet, View } from "react-native";

type Props = {
  totalPrice: number;
  onCheckout: () => void;
};

export default function CartFooter({ totalPrice, onCheckout }: Props) {
  return (
    <View style={styles.footer}>
      <View style={styles.totalRow}>
        <AppText size={16} weight="medium" color="#61685c">
          Total
        </AppText>
        <AppText size={24} weight="bold" color="#363a33">
          ${totalPrice.toFixed(2)}
        </AppText>
      </View>

      <Button
        label="Checkout"
        onPress={onCheckout}
        style={styles.checkoutButton}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    borderTopWidth: 1,
    borderTopColor: "#e2e6df",
    paddingVertical: 16,
    paddingBottom: 24,
    gap: 14,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  checkoutButton: {
    width: "100%",
  },
});
