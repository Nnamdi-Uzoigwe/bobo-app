// import AppText from "@/components/AppText";
// import Button from "@/components/Button";
// import OtpInput from "@/components/OtpInput";
// import { router } from "expo-router";
// import { useState } from "react";
// import {
//   Image,
//   Keyboard,
//   StyleSheet,
//   TouchableOpacity,
//   TouchableWithoutFeedback,
//   View,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";

// export default function VerifyOtp() {
//   const [loading, setLoading] = useState(false);

//   const handleProceed = () => {
//     setLoading(true);
//     console.log("loading...");
//     setTimeout(() => {
//       setLoading(false);
//       router.replace("/(auth)/reset-password");
//       console.log("loading stopped");
//     }, 3000);
//   };

//   return (
//     <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
//       <SafeAreaView style={styles.container}>
//         <Image source={require("@/assets/images/app-logo.png")} />
//         <View style={styles.header}>
//           <AppText color="#5ead1d" size={30} weight="bold">
//             Verify OTP
//           </AppText>
//           <AppText color="#363A33" weight="medium" size={16}>
//             Enter the verification code sent to your mail.
//           </AppText>
//         </View>

//         <View>
//           <OtpInput />
//         </View>

//         <View style={styles.buttonContainer}>
//           <Button label="Verify" onPress={handleProceed} loading={loading} />
//         </View>

//         <View style={styles.gap}>
//           <AppText color="#363A33">Didn't receive the code? </AppText>
//           <TouchableOpacity>
//             <AppText color="#363A33" weight="semibold">
//               Resend
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
//     marginBottom: 60,
//   },
//   buttonContainer: {
//     marginTop: 60,
//     width: "100%",
//   },
//   gap: {
//     marginTop: 20,
//     flexDirection: "row",
//     gap: 4,
//     alignItems: "center",
//   },
// });

import AppText from "@/components/AppText";
import Button from "@/components/Button";
import OtpInput from "@/components/OtpInput";
import { apiPost } from "@/lib/api";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  Image,
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function VerifyOtp() {
  const { email } = useLocalSearchParams<{ email: string }>();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleProceed = async () => {
    setLoading(true);
    try {
      const data = await apiPost("/auth/verify-reset-otp", { email, otp });
      router.replace({
        pathname: "/(auth)/reset-password",
        params: { resetToken: data.resetToken },
      });
    } catch (err: any) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      await apiPost("/auth/forgot-password", { email });
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container}>
        <Image source={require("@/assets/images/app-logo.png")} />
        <View style={styles.header}>
          <AppText color="#5ead1d" size={30} weight="bold">
            Verify OTP
          </AppText>
          <AppText color="#363A33" weight="medium" size={16}>
            Enter the verification code sent to your mail.
          </AppText>
        </View>

        <View>
          <OtpInput length={6} onComplete={setOtp} />
        </View>

        <View style={styles.buttonContainer}>
          <Button
            label="Verify"
            onPress={handleProceed}
            loading={loading}
            disabled={otp.length !== 6}
          />
        </View>

        <View style={styles.gap}>
          <AppText color="#363A33">Didn't receive the code? </AppText>
          <TouchableOpacity onPress={handleResend}>
            <AppText color="#363A33" weight="semibold">
              Resend
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
  header: { marginTop: 30, alignSelf: "flex-start", marginBottom: 60 },
  buttonContainer: { marginTop: 60, width: "100%" },
  gap: { marginTop: 20, flexDirection: "row", gap: 4, alignItems: "center" },
});
