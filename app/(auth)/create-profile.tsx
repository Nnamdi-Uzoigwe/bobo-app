import AppText from "@/components/AppText";
import AvatarPicker from "@/components/AvatarPicker";
import Button from "@/components/Button";
import DateOfBirthPicker from "@/components/DateOfBirthPicker";
import PhoneNumberInput from "@/components/PhoneNumberInput";
import { apiPatch } from "@/lib/api";
import { useAuthStore } from "@/store/authStore";
import { router } from "expo-router";
import { useState } from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CreateProfile() {
  const token = useAuthStore((s) => s.token);
  const setAuth = useAuthStore((s) => s.setAuth);
  const user = useAuthStore((s) => s.user);

  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+234");
  const [dob, setDob] = useState<Date | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [isFocused, setIsFocused] = useState(false);
  const [isAddressFocused, setIsAddressFocused] = useState(false);
  const [isNumberFocused, setIsNumberFocused] = useState(false);
  const [isDateFocused, setIsDateFocused] = useState(false);

  const isFormValid =
    fullName.trim() !== "" &&
    address.trim() !== "" &&
    phoneNumber.trim() !== "" &&
    dob !== null;

  const handleContinue = async () => {
    if (!isFormValid || !dob) return;

    setLoading(true);
    setError("");
    try {
      const data = await apiPatch(
        "/users/me",
        {
          fullName,
          address,
          phone: `${countryCode}${phoneNumber}`,
          dob: dob.toISOString(),
        },
        token ?? undefined,
      );

      // merge the updated fields into the existing auth user
      if (token) {
        setAuth(token, { ...user, ...data });
      }

      router.replace("/(tabs)/home");
    } catch (err: any) {
      console.error(err.message);
      setError(err.message || "Failed to save profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1, width: "100%" }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <Image source={require("@/assets/images/app-logo.png")} />

            <AppText
              size={26}
              weight="semibold"
              color="#363a33"
              style={{ marginVertical: 20 }}
            >
              Create your new profile
            </AppText>

            <AvatarPicker />

            <View style={styles.formContainer}>
              {/* full name */}
              <View style={{ gap: 4 }}>
                <AppText size={17} color="#363a33" weight="semibold">
                  Full name
                </AppText>
                <TextInput
                  placeholder="Your full name"
                  style={[
                    styles.textInput,
                    isFocused && styles.textInputFocused,
                  ]}
                  placeholderTextColor="#60655c"
                  value={fullName}
                  onChangeText={setFullName}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                />
              </View>

              {/* phone number */}
              <View style={{ gap: 4 }}>
                <AppText size={17} color="#363a33" weight="semibold">
                  Phone number
                </AppText>

                <PhoneNumberInput
                  phoneNumber={phoneNumber}
                  onChangePhoneNumber={setPhoneNumber}
                  countryCode={countryCode}
                  onChangeCountryCode={setCountryCode}
                  isNumberFocused={isNumberFocused}
                  setIsNumberFocused={setIsNumberFocused}
                />
              </View>

              {/* Date of birth */}
              <View style={{ gap: 4 }}>
                <AppText size={17} color="#363a33" weight="semibold">
                  Date of birth
                </AppText>

                <DateOfBirthPicker
                  value={dob}
                  onChange={setDob}
                  minAge={13}
                  maxAge={100}
                  isDateFocused={isDateFocused}
                  setIsDateFocused={setIsDateFocused}
                />
              </View>

              {/* Address */}
              <View style={{ gap: 4 }}>
                <AppText size={17} color="#363a33" weight="semibold">
                  Address
                </AppText>
                <TextInput
                  placeholder="Your address"
                  style={[
                    styles.textInput,
                    isAddressFocused && styles.textInputFocused,
                  ]}
                  placeholderTextColor="#60655c"
                  value={address}
                  onChangeText={setAddress}
                  onFocus={() => setIsAddressFocused(true)}
                  onBlur={() => setIsAddressFocused(false)}
                />
              </View>
            </View>

            {error !== "" && (
              <AppText
                color="#E4572E"
                size={14}
                style={{ marginTop: 12, textAlign: "center" }}
              >
                {error}
              </AppText>
            )}

            <View style={{ marginTop: 20, width: "100%" }}>
              <Button
                label="Continue"
                onPress={handleContinue}
                loading={loading}
                disabled={!isFormValid}
              />
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollContent: {
    alignItems: "center",
    paddingHorizontal: 10,
    paddingTop: 15,
    paddingBottom: 40,
    gap: 10,
  },
  formContainer: {
    width: "100%",
    marginTop: 30,
    gap: 10,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#f5f6f3",
    backgroundColor: "#F5F6F3",
    padding: 14,
    borderRadius: 10,
    fontSize: 15,
    fontFamily: "Poppins-regular",
  },
  textInputFocused: {
    borderColor: "#5ead1d",
  },
});
