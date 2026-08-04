import { StyleSheet, View } from "react-native";

export default function Gray() {
  return (
    <View style={styles.blobContainer}>
      <View style={styles.blob} />
    </View>
  );
}

const styles = StyleSheet.create({
  blobContainer: {
    position: "absolute",
    width: 300,
    height: 300,
    alignItems: "center",
    justifyContent: "center",
  },

  blob: {
    width: 250,
    height: 220,
    backgroundColor: "#F5F8F2",

    // Makes it look less like a perfect circle
    borderTopLeftRadius: 120,
    borderTopRightRadius: 150,
    borderBottomLeftRadius: 150,
    borderBottomRightRadius: 100,

    transform: [{ rotate: "-8deg" }, { scaleX: 1.15 }],
  },
});
