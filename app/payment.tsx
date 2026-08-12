import AppText from "@/components/AppText";
import Button from "@/components/Button";
import ScreenHeader from "@/components/ui/ScreenHeader";
import { useTheme } from "@/theme/ThemeProvider";
import { Feather } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CARDS = [{ id: "1", label: "Visa •••• 4242", isDefault: true }];

export default function PaymentScreen() {
  const { colors } = useTheme();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <ScreenHeader title="Payment" />

      <View style={styles.content}>
        {CARDS.map((card) => (
          <View
            key={card.id}
            style={[styles.card, { borderColor: colors.border }]}
          >
            <View style={styles.left}>
              <View
                style={[styles.iconWrap, { backgroundColor: colors.surface }]}
              >
                <Feather
                  name="credit-card"
                  size={18}
                  color={colors.textMuted}
                />
              </View>
              <AppText size={15} weight="medium" color={colors.text}>
                {card.label}
              </AppText>
            </View>
            {card.isDefault && (
              <AppText size={12} weight="semibold" color={colors.primary}>
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
  container: { flex: 1, paddingHorizontal: 10 },
  content: { paddingTop: 4 },
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
  },
  left: { flexDirection: "row", alignItems: "center", gap: 12 },
  iconWrap: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
  },
  addButton: { alignSelf: "stretch", marginTop: 10 },
});
