import { StyleSheet, View } from "react-native";

interface DotNavigationProps {
    activeIndex: number;
}

export default function DotNavigation({ activeIndex }: DotNavigationProps) {
  

  return (
    <View style={styles.container}>
      {[0, 1, 2].map((index) => (
        <View
          key={index}
          style={[
            styles.dot,
            index === activeIndex && styles.activeDot,
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#D9D9D9",
  },

  activeDot: {
    width: 24,
    backgroundColor: "#54A312",
  },
});