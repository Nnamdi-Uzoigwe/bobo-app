import { StyleSheet, View } from "react-native";

export default function DarkGray() {
  return (
    <View style={styles.blobContainer}>
      <View style={styles.blob} />
    </View>
  );
}

const styles = StyleSheet.create({
  blobContainer: {
    position: "absolute",
    width: 200,
    height: 200,
    alignItems: "center",
    justifyContent: "center",
  },

  blob: {
    width: 150,
    height: 120,
    backgroundColor: "#9cb480",

    // Makes it look less like a perfect circle
    borderTopLeftRadius: 120,
    borderTopRightRadius: 150,
    borderBottomLeftRadius: 150,
    borderBottomRightRadius: 100,

    transform: [{ rotate: "-8deg" }, { scaleX: 1.15 }],
  },
});
