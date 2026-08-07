// components/profile/ProfileMenuRow.tsx
import AppText from "@/components/AppText";
import { Feather } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View } from "react-native";

type Props = {
  icon: keyof typeof Feather.glyphMap;
  label: string;
  onPress?: () => void;
};

export default function ProfileMenuRow({ icon, label, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.row} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.left}>
        <View style={styles.iconWrap}>
          <Feather name={icon} size={18} color="#61685c" />
        </View>
        <AppText size={15} weight="medium" color="#363a33">
          {label}
        </AppText>
      </View>

      <Feather name="chevron-right" size={20} color="#a6af9f" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  iconWrap: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#F4F7F2",
    alignItems: "center",
    justifyContent: "center",
  },
});
