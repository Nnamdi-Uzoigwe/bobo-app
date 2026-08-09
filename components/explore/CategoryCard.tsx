import { LinearGradient } from "expo-linear-gradient";
import {
  ImageBackground,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import AppText from "../AppText";

type Props = {
  label: string;
  image: ImageSourcePropType;
  onPress: () => void;
};

export default function CategoryCard({ label, image, onPress }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      style={styles.card}
    >
      <ImageBackground
        source={image}
        style={styles.image}
        imageStyle={styles.imageRadius}
      >
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.55)"]}
          style={styles.gradient}
        >
          <AppText size={20} weight="bold" color="white">
            {label}
          </AppText>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    height: 140,
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 16,
  },
  image: {
    flex: 1,
    justifyContent: "flex-end",
  },
  imageRadius: {
    borderRadius: 20,
  },
  gradient: {
    paddingVertical: 16,
    alignItems: "center",
  },
});
