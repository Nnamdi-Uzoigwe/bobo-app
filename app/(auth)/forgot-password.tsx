// import AppText from "@/components/AppText";
// import Button from "@/components/Button";
// import { router } from "expo-router";
// import { useState } from "react";
// import {
//   Image,
//   Keyboard,
//   StyleSheet,
//   TextInput,
//   TouchableOpacity,
//   TouchableWithoutFeedback,
//   View,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";

// export default function ForgotPassword() {
//   const [isFocused, setIsFocused] = useState(false);
//   const [isPasswordFocused, setIsPasswordFocused] = useState(false);
//   const [isOpen, setIsOpen] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const handleProceed = () => {
//     setLoading(true);
//     console.log("loading...");
//     setTimeout(() => {
//       setLoading(false);
//       router.replace("/(auth)/verify-otp");
//       console.log("loading stopped");
//     }, 3000);
//   };

//   return (
//     <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
//       <SafeAreaView style={styles.container}>
//         <Image source={require("@/assets/images/app-logo.png")} />

//         <View style={styles.header}>
//           <AppText color="#5ead1d" weight="bold" size={30}>
//             Forgot your password?
//           </AppText>

//           <AppText color="#363A33" weight="medium" size={17}>
//             Enter the email address associated with your account. We'll send a
//             verification code to this email.
//           </AppText>
//         </View>

//         <View style={styles.formContainer}>
//           {/* Email address */}
//           <View style={styles.emailContainer}>
//             <AppText color="#363a33" weight="semibold" size={16}>
//               Email Address
//             </AppText>
//             <TextInput
//               placeholder="Your email address"
//               style={[styles.textInput, isFocused && styles.textInputFocused]}
//               placeholderTextColor="#60655c"
//               onFocus={() => setIsFocused(true)}
//               onBlur={() => setIsFocused(false)}
//               autoCapitalize="none"
//             />
//           </View>
//         </View>

//         <View style={{ width: "100%" }}>
//           <Button label="Continue" onPress={handleProceed} loading={loading} />
//         </View>

//         <View style={{ marginTop: 100, flexDirection: "row", gap: 3 }}>
//           <AppText size={17}>Don't have an account?</AppText>
//           <TouchableOpacity onPress={() => router.replace("/(auth)/signup")}>
//             <AppText size={17} weight="bold">
//               Sign up
//             </AppText>
//           </TouchableOpacity>
//         </View>
//       </SafeAreaView>
//     </TouchableWithoutFeedback>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     backgroundColor: "white",
//     paddingHorizontal: 10,
//     paddingTop: 15,
//   },
//   header: {
//     marginTop: 30,
//     alignSelf: "flex-start",
//     gap: 5,
//   },
//   textInput: {
//     borderWidth: 1.5,
//     borderColor: "#f5f6f3",
//     backgroundColor: "#F5F6F3",
//     padding: 14,
//     borderRadius: 10,
//     fontSize: 16,
//     fontFamily: "Poppins-Regular",
//   },
//   textInputFocused: {
//     borderColor: "#5ead1d",
//   },
//   passwordInputFocused: {
//     borderColor: "#5ead1d",
//   },
//   emailContainer: {
//     gap: 4,
//   },
//   formContainer: {
//     marginVertical: 40,
//     width: "100%",
//     gap: 10,
//   },
// });

import AppText from "@/components/AppText";
import Button from "@/components/Button";
import { apiPost } from "@/lib/api";
import { router } from "expo-router";
import { useState } from "react";
import {
  Image,
  Keyboard,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleProceed = async () => {
    setLoading(true);
    try {
      await apiPost("/auth/forgot-password", { email });
      router.replace({
        pathname: "/(auth)/verify-otp",
        params: { email },
      });
    } catch (err: any) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container}>
        <Image source={require("@/assets/images/app-logo.png")} />

        <View style={styles.header}>
          <AppText color="#5ead1d" weight="bold" size={30}>
            Forgot your password?
          </AppText>

          <AppText color="#363A33" weight="medium" size={17}>
            Enter the email address associated with your account. We'll send a
            verification code to this email.
          </AppText>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.emailContainer}>
            <AppText color="#363a33" weight="semibold" size={16}>
              Email Address
            </AppText>
            <TextInput
              placeholder="Your email address"
              style={[styles.textInput, isFocused && styles.textInputFocused]}
              placeholderTextColor="#60655c"
              value={email}
              onChangeText={setEmail}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              autoCapitalize="none"
            />
          </View>
        </View>

        <View style={{ width: "100%" }}>
          <Button
            label="Continue"
            onPress={handleProceed}
            loading={loading}
            disabled={email.trim() === ""}
          />
        </View>

        <View style={{ marginTop: 100, flexDirection: "row", gap: 3 }}>
          <AppText size={17}>Don't have an account?</AppText>
          <TouchableOpacity onPress={() => router.replace("/(auth)/signup")}>
            <AppText size={17} weight="bold">
              Sign up
            </AppText>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingTop: 15,
  },
  header: { marginTop: 30, alignSelf: "flex-start", gap: 5 },
  textInput: {
    borderWidth: 1.5,
    borderColor: "#f5f6f3",
    backgroundColor: "#F5F6F3",
    padding: 14,
    borderRadius: 10,
    fontSize: 16,
    fontFamily: "Poppins-Regular",
  },
  textInputFocused: { borderColor: "#5ead1d" },
  emailContainer: { gap: 4 },
  formContainer: { marginVertical: 40, width: "100%", gap: 10 },
});
