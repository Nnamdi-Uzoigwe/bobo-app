import AppText from "@/components/AppText";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";

type ScreenHeaderProps = {
  title: string;
  rightIcon?: keyof typeof Feather.glyphMap;
  onRightPress?: () => void;
};

export default function ScreenHeader({
  title,
  rightIcon,
  onRightPress,
}: ScreenHeaderProps) {
  const router = useRouter();

  return (
    <View style={styles.header}>
      <Pressable onPress={() => router.back()} hitSlop={12} style={styles.side}>
        <Feather name="arrow-left" size={20} color="#363a33" />
        <AppText size={15} weight="medium" color="#363a33">
          Back
        </AppText>
      </Pressable>

      <AppText size={16} weight="bold" color="#1F2937">
        {title}
      </AppText>

      <Pressable
        onPress={onRightPress}
        hitSlop={12}
        style={[styles.side, styles.rightSide]}
        disabled={!rightIcon}
      >
        {rightIcon && <Feather name={rightIcon} size={20} color="#363a33" />}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  side: { flexDirection: "row", alignItems: "center", gap: 4, width: 70 },
  rightSide: { justifyContent: "flex-end" },
});
