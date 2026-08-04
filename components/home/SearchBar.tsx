// import { Feather } from "@expo/vector-icons";
// import { useState } from "react";
// import { StyleSheet, TextInput, View } from "react-native";

// export default function SearchBar() {
//   const [isFocused, setIsFocused] = useState(false);
//   return (
//     <View>
//       <TextInput
//         placeholder="Search..."
//         style={[styles.input, isFocused && styles.textInputFocused]}
//         placeholderTextColor="#60655c"
//         onFocus={() => setIsFocused(true)}
//         onBlur={() => setIsFocused(false)}
//       />
//       <Feather
//         style={styles.searchIcon}
//         name="search"
//         size={20}
//         color="#c4c6c2"
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   input: {
//     borderWidth: 1,
//     borderColor: "#c4c6c2",
//     padding: 14,
//     borderRadius: 14,
//     fontSize: 15,
//     fontFamily: "Poppins-Regular",
//     position: "relative",
//     paddingLeft: 34,
//   },
//   searchIcon: {
//     position: "absolute",
//     top: 14,
//     left: 10,
//   },
//   textInputFocused: {
//     borderColor: "#5ead1d",
//   },
// });

import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";

export default function SearchBar() {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.container, isFocused && styles.containerFocused]}>
      <Feather
        name="search"
        size={20}
        color={isFocused ? "#5ead1d" : "#9CA3AF"}
      />
      <TextInput
        placeholder="Search..."
        style={styles.input}
        placeholderTextColor="#9CA3AF"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
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
