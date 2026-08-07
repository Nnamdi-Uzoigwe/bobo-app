import AppText from "@/components/AppText";
import Button from "@/components/Button";
import ScreenHeader from "@/components/ui/ScreenHeader";
import { Feather } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CARDS = [{ id: "1", label: "Visa •••• 4242", isDefault: true }];

export default function PaymentScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader title="Payment" />

      <View style={styles.content}>
        {CARDS.map((card) => (
          <View key={card.id} style={styles.card}>
            <View style={styles.left}>
              <View style={styles.iconWrap}>
                <Feather name="credit-card" size={18} color="#61685c" />
              </View>
              <AppText size={15} weight="medium" color="#363a33">
                {card.label}
              </AppText>
            </View>
            {card.isDefault && (
              <AppText size={12} weight="semibold" color="#5EAD1D">
                Default
              </AppText>
            )}
          </View>
        ))}

        <Button
          label="Add payment method"
          onPress={() => {}}
          style={styles.addButton}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF", paddingHorizontal: 10 },
  content: { paddingTop: 4 },
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#E2E6DF",
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
  },
  left: { flexDirection: "row", alignItems: "center", gap: 12 },
  iconWrap: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#F4F7F2",
    alignItems: "center",
    justifyContent: "center",
  },
  addButton: { alignSelf: "stretch", marginTop: 10 },
});
