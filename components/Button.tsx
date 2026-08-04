import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";
import AppText from "./AppText";

type ButtonProps = {
  label: string;
  onPress: () => void;
  outline?: boolean;
  loading?: boolean;
};

export default function Button({
  label,
  onPress,
  loading,
  outline = false,
}: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        outline ? styles.outlineButton : styles.filledButton,
        pressed && styles.pressed,
      ]}
    >
      { loading ? <ActivityIndicator color="#ffffff" /> : ( 
      <AppText
        style={[
          styles.text,
          outline ? styles.outlineText : styles.filledText,
        ]}
        weight="semibold"
      >
          {label}
        {/* {label} */}
      </AppText>
        )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 52,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  filledButton: {
    backgroundColor: "#5EAD1D",
  },

  outlineButton: {
    backgroundColor: "#ECF1E8",
  },

  text: {
    fontSize: 16,
    fontWeight: "600",
  },

  filledText: {
    color: "#FFFFFF",
  },

  outlineText: {
    color: "#5ead1d",
  },

  pressed: {
    opacity: 0.7,
  },
});
