import AppText from "@/components/AppText";
import Button from "@/components/Button";
import ScreenHeader from "@/components/ui/ScreenHeader";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SubscriptionScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader title="Subscription" />

      <View style={styles.card}>
        <MaterialIcons name="stars" size={28} color="#B8860B" />
        <AppText
          size={17}
          weight="bold"
          color="#1F2937"
          style={styles.planName}
        >
          Premium Plan
        </AppText>
        <AppText size={13} color="#61685c" style={styles.renewText}>
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
  container: { flex: 1, backgroundColor: "#FFFFFF", paddingHorizontal: 10 },
  card: {
    borderWidth: 1,
    borderColor: "#E2E6DF",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    marginTop: 10,
  },
  planName: { marginTop: 10 },
  renewText: { marginTop: 4, marginBottom: 16 },
  button: { alignSelf: "stretch" },
});
