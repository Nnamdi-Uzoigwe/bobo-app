import AppText from "@/components/AppText";
import Button from "@/components/Button";
import { apiPost } from "@/lib/api";
import Feather from "@expo/vector-icons/Feather";
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

export default function Signup() {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleProceed = async () => {
    setLoading(true);
    try {
      await apiPost("/auth/signup", { email, password });
      router.replace({
        pathname: "/(auth)/verify-account",
        params: { email },
      });
    } catch (err: any) {
      // TODO: surface this in your UI (e.g. a toast or inline error text)
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
            Create a new account
          </AppText>
        </View>

        <View style={styles.formContainer}>
          {/* Email address */}
          <View style={styles.emailContainer}>
            <AppText color="#363a33" weight="semibold" size={16}>
              Email Address
            </AppText>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Your email address"
              style={[styles.textInput, isFocused && styles.textInputFocused]}
              placeholderTextColor="#60655c"
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
          </View>
          <View style={styles.passwordInputContainer}>
            <AppText color="#363a33" weight="semibold" size={16}>
              Password
            </AppText>
            <TextInput
              placeholder="Password"
              placeholderTextColor="#60655c"
              value={password}
              onChangeText={setPassword}
              textContentType="password"
              secureTextEntry={!isOpen}
              style={[
                styles.passwordInput,
                isPasswordFocused && styles.passwordInputFocused,
              ]}
              onFocus={() => setIsPasswordFocused(true)}
              onBlur={() => setIsPasswordFocused(false)}
            />
            <TouchableOpacity
              onPress={() => setIsOpen((isOpen) => !isOpen)}
              style={styles.passwordIconButton}
            >
              <Feather
                name={isOpen ? "eye" : "eye-off"}
                size={18}
                color="#363a33"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity>
            <AppText weight="semibold" color="#5ead1d">
              Forgot Password?
            </AppText>
          </TouchableOpacity>
        </View>

        <View style={{ width: "100%" }}>
          <Button
            label="Create account"
            onPress={handleProceed}
            loading={loading}
          />
        </View>

        <View style={{ marginTop: 100, flexDirection: "row", gap: 3 }}>
          <AppText size={17}>Already have an account?</AppText>
          <TouchableOpacity onPress={() => router.back()}>
            <AppText size={17} weight="bold">
              Log in
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
  header: {
    marginTop: 30,
    alignSelf: "flex-start",
  },
  textInput: {
    borderWidth: 1.5,
    borderColor: "#f5f6f3",
    backgroundColor: "#F5F6F3",
    padding: 14,
    borderRadius: 10,
    fontSize: 16,
    fontFamily: "Poppins-regular",
  },
  textInputFocused: {
    borderColor: "#5ead1d",
  },
  passwordInputFocused: {
    borderColor: "#5ead1d",
  },
  emailContainer: {
    gap: 4,
  },
  formContainer: {
    marginVertical: 40,
    width: "100%",
    gap: 10,
  },
  passwordInputContainer: {
    position: "relative",
    width: "100%",
    marginTop: 8,
    gap: 4,
  },
  passwordInput: {
    width: "100%",
    borderWidth: 1.5,
    borderColor: "#f5f6f3",
    backgroundColor: "#F5F6F3",
    padding: 14,
    paddingRight: 50,
    borderRadius: 10,
    fontSize: 16,
    fontFamily: "Poppins-regular",
  },
  passwordIcon: {
    position: "absolute",
    top: 3,
    right: 14,
  },
  passwordIconButton: {
    position: "absolute",
    right: 14,
    top: 24,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});
