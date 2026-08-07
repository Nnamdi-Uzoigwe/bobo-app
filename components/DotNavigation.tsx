import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

interface DotNavigationProps {
  activeIndex: number;
}

const DOT_COUNT = 3;
const INACTIVE_COLOR = "#D9D9D9";
const ACTIVE_COLOR = "#54A312";

export default function DotNavigation({ activeIndex }: DotNavigationProps) {
  return (
    <View style={styles.container}>
      {Array.from({ length: DOT_COUNT }).map((_, index) => (
        <Dot key={index} isActive={index === activeIndex} />
      ))}
    </View>
  );
}

function Dot({ isActive }: { isActive: boolean }) {
  const progress = useSharedValue(isActive ? 1 : 0);

  useEffect(() => {
    progress.value = withSpring(isActive ? 1 : 0, {
      damping: 14,
      stiffness: 180,
    });
  }, [isActive]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: 12 + progress.value * 12,
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      [INACTIVE_COLOR, ACTIVE_COLOR],
    ),
  }));

  return <Animated.View style={[styles.dot, animatedStyle]} />;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  dot: {
    height: 12,
    borderRadius: 6,
  },
});
