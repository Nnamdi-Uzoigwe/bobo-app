import {
  ActivityIndicator,
  Pressable,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from "react-native";
import AppText from "./AppText";

type ButtonProps = {
  label: string;
  onPress: () => void;
  outline?: boolean;
  loading?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

export default function Button({
  label,
  onPress,
  loading,
  outline = false,
  disabled = false,
  style,
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.button,
        outline ? styles.outlineButton : styles.filledButton,
        pressed && styles.pressed,
        isDisabled && styles.disabledButton,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color="#ffffff" />
      ) : (
        <AppText
          style={[
            styles.text,
            outline ? styles.outlineText : styles.filledText,
          ]}
          weight="semibold"
        >
          {label}
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
    paddingHorizontal: 20,
    // alignSelf: "flex-start",
  },

  filledButton: {
    backgroundColor: "#5EAD1D",
  },

  outlineButton: {
    backgroundColor: "#ECF1E8",
  },

  disabledButton: {
    opacity: 0.5,
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
