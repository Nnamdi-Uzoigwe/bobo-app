import AppText from "@/components/AppText";
import Button from "@/components/Button";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function EmptyOrders() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        name="package-variant"
        size={80}
        color="#8FBF5E"
      />
      <AppText size={20} weight="bold" color="#1F2937" style={styles.title}>
        There are no orders!
      </AppText>
      <AppText size={14} color="#6B7280" style={styles.subtitle}>
        Place order to show here. Previous orders will be shown here as well.
      </AppText>
      <Button
        label="My Cart"
        onPress={() => router.push("/cart")}
        style={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center", paddingTop: 60, paddingHorizontal: 30 },
  title: { textAlign: "center", marginTop: 20, marginBottom: 8 },
  subtitle: { textAlign: "center", lineHeight: 20, marginBottom: 24 },
  button: { alignSelf: "stretch" },
});
