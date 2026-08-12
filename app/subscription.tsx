import AppText from "@/components/AppText";
import Button from "@/components/Button";
import ScreenHeader from "@/components/ui/ScreenHeader";
import { useTheme } from "@/theme/ThemeProvider";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SubscriptionScreen() {
  const { colors } = useTheme();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <ScreenHeader title="Subscription" />

      <View style={[styles.card, { borderColor: colors.border }]}>
        <MaterialIcons name="stars" size={28} color="#B8860B" />
        <AppText
          size={17}
          weight="bold"
          color={colors.text}
          style={styles.planName}
        >
          Premium Plan
        </AppText>
        <AppText size={13} color={colors.textMuted} style={styles.renewText}>
          Renews on Sept 4, 2026
        </AppText>
        <Button
          label="Manage subscription"
          onPress={() => {}}
          outline
          style={styles.button}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 10 },
  card: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    marginTop: 10,
  },
  planName: { marginTop: 10 },
  renewText: { marginTop: 4, marginBottom: 16 },
  button: { alignSelf: "stretch" },
});
