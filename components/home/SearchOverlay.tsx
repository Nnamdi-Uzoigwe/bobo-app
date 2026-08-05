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
          <Pressable
            key={item}
            style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
          >
            <Feather name="arrow-up-right" size={16} color="#9CA3AF" />

            <AppText style={styles.rowText}>{item}</AppText>
          </Pressable>
        ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.15)",
    zIndex: 5,
  },

  dropdown: {
    position: "absolute",
    left: 10,
    right: 10,
    top: 190, // we'll improve this later
    backgroundColor: "white",
    borderRadius: 20,
    paddingVertical: 8,
    zIndex: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 6,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingHorizontal: 18,
    paddingVertical: 14,
  },

  rowPressed: {
    backgroundColor: "#FAFAFA",
  },

  rowText: {
    fontSize: 15,
    color: "#4B5563",
  },
});
