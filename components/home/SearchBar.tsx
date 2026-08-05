import { Feather } from "@expo/vector-icons";
import { StyleSheet, TextInput, View } from "react-native";

type SearchBarProps = {
  value: string;
  onChangeText: (text: string) => void;
  isFocused: boolean;
  onFocus: () => void;
  onBlur: () => void;
};

export default function SearchBar({
  value,
  onChangeText,
  isFocused,
  onFocus,
  onBlur,
}: SearchBarProps) {
  return (
    <View style={[styles.container, isFocused && styles.containerFocused]}>
      <Feather
        name="search"
        size={20}
        color={isFocused ? "#5ead1d" : "#9CA3AF"}
      />

      <TextInput
        value={value}
        onChangeText={onChangeText}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder="Search..."
        placeholderTextColor="#9CA3AF"
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#F5F6F3",
    borderWidth: 1,
    borderColor: "#F5F6F3",
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 50,
  },
  containerFocused: {
    borderColor: "#5ead1d",
    backgroundColor: "#FFFFFF",
  },
  input: {
    flex: 1,
    fontSize: 15,
    fontFamily: "Poppins-Regular",
    color: "#1F2937",
    height: "100%",
  },
});
