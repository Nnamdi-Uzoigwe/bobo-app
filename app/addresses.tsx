import AppText from "@/components/AppText";
import Button from "@/components/Button";
import ScreenHeader from "@/components/ui/ScreenHeader";
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
  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader title="Addresses" />

      <View style={styles.content}>
        {ADDRESSES.map((address) => (
          <View key={address.id} style={styles.card}>
            <View style={styles.iconWrap}>
              <Feather name="map-pin" size={18} color="#61685c" />
            </View>
            <View style={styles.textCol}>
              <AppText size={15} weight="semibold" color="#363a33">
                {address.label}
              </AppText>
              <AppText size={13} color="#61685c">
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
  container: { flex: 1, backgroundColor: "#FFFFFF", paddingHorizontal: 10 },
  content: { paddingTop: 4 },
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderWidth: 1,
    borderColor: "#E2E6DF",
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
  },
  iconWrap: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#F4F7F2",
    alignItems: "center",
    justifyContent: "center",
  },
  textCol: { gap: 2 },
  addButton: { alignSelf: "stretch", marginTop: 10 },
});
