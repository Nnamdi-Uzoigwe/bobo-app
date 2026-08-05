import { Feather } from "@expo/vector-icons";
import { Pressable, StyleSheet, View } from "react-native";
import AppText from "../AppText";

const suggestions = [
  "Chocolate boba",
  "Grilled beef burger",
  "Honey bee cake",
  "Classic momos",
];

type Props = {
  visible: boolean;
  onClose: () => void;
};

export default function SearchOverlay({ visible, onClose }: Props) {
  if (!visible) return null;

  return (
    <>
      <Pressable style={styles.backdrop} onPress={onClose} />

      <View style={styles.dropdown}>
        {suggestions.map((item) => (
          <Pressable key={item} style={styles.row}>
            <Feather name="search" size={16} color="#9CA3AF" />

            <AppText>{item}</AppText>
          </Pressable>
        ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.18)",
    zIndex: 5,
  },

  dropdown: {
    position: "absolute",
    left: 10,
    right: 10,
    top: 160, // we'll improve this later
    backgroundColor: "white",
    borderRadius: 16,
    paddingVertical: 10,
    zIndex: 10,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
});
