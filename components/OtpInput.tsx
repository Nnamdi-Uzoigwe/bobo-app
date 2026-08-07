import { useRef, useState } from "react";
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputKeyPressEventData,
  View,
} from "react-native";

type OTPInputProps = {
  length?: number;
  onComplete?: (otp: string) => void;
};

export default function OTPInput({ length = 4, onComplete }: OTPInputProps) {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""));
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  const inputRefs = useRef<(TextInput | null)[]>([]);

  const handleChange = (value: string, index: number) => {
    // Allow empty value so the X button can clear the input
    if (value === "") {
      const newOtp = [...otp];
      newOtp[index] = "";

      setOtp(newOtp);
      return;
    }

    // Only allow numbers
    const digit = value.replace(/[^0-9]/g, "");

    if (!digit) return;

    const newOtp = [...otp];
    newOtp[index] = digit;

    setOtp(newOtp);

    // Move to next input
    if (index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Check if OTP is complete
    if (newOtp.every((item) => item !== "")) {
      onComplete?.(newOtp.join(""));
    }
  };

  const handleKeyPress = (
    event: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number,
  ) => {
    if (
      event.nativeEvent.key === "Backspace" &&
      otp[index] === "" &&
      index > 0
    ) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={styles.container}>
      {otp.map((value, index) => (
        <TextInput
          key={index}
          ref={(ref) => {
            inputRefs.current[index] = ref;
          }}
          value={value}
          onChangeText={(text) => handleChange(text, index)}
          onKeyPress={(event) => handleKeyPress(event, index)}
          onFocus={() => setFocusedIndex(index)}
          onBlur={() => setFocusedIndex(null)}
          keyboardType="number-pad"
          maxLength={1}
          style={[styles.input, focusedIndex === index && styles.inputFocused]}
          textAlign="center"
          selectionColor="#5ead1d"
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },

  input: {
    width: 60,
    height: 60,
    borderWidth: 1.5,
    borderColor: "#f5f6f3",
    backgroundColor: "#F5F6F3",
    borderRadius: 10,
    fontSize: 24,
    fontFamily: "PoppinsRegular",
    color: "#363a33",
  },

  inputFocused: {
    borderColor: "#5ead1d",
  },
});
