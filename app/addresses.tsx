import AppText from "@/components/AppText";
import Button from "@/components/Button";
import ScreenHeader from "@/components/ui/ScreenHeader";
import { useTheme } from "@/theme/ThemeProvider";
import { Feather } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ADDRESSES = [
  {
    id: "1",
    label: "Home",
    detail: "12 Aso Villa Road, Abuja",
    isDefault: true,
  },
];

export default function AddressesScreen() {
  const { colors } = useTheme();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <ScreenHeader title="Addresses" />

      <View style={styles.content}>
        {ADDRESSES.map((address) => (
          <View
            key={address.id}
            style={[styles.card, { borderColor: colors.border }]}
          >
            <View
              style={[styles.iconWrap, { backgroundColor: colors.surface }]}
            >
              <Feather name="map-pin" size={18} color={colors.textMuted} />
            </View>
            <View style={styles.textCol}>
              <AppText size={15} weight="semibold" color={colors.text}>
                {address.label}
              </AppText>
              <AppText size={13} color={colors.textMuted}>
                {address.detail}
              </AppText>
            </View>
          </View>
        ))}

        <Button
          label="Add new address"
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
    gap: 12,
    borderWidth: 1,
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
  },
  iconWrap: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
  },
  textCol: { gap: 2 },
  addButton: { alignSelf: "stretch", marginTop: 10 },
});
