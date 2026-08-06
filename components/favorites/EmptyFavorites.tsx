import AppText from "@/components/AppText";
import { StyleSheet, View } from "react-native";

export default function EmptyFavorites() {
  return (
    <View style={styles.container}>
      <AppText size={18} weight="medium" color="#61685c">
        No favorites yet
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
