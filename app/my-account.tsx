import AppText from "@/components/AppText";
import Button from "@/components/Button";
import ScreenHeader from "@/components/ui/ScreenHeader";
import { apiPatch } from "@/lib/api";
import { useAuthStore } from "@/store/authStore";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function getInitials(fullName?: string): string {
  if (!fullName) return "?";
  const parts = fullName.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return parts[0].slice(0, 2).toUpperCase();
}

export default function MyAccountScreen() {
  const token = useAuthStore((s) => s.token);
  const user = useAuthStore((s) => s.user);
  const setAuth = useAuthStore((s) => s.setAuth);

  const [name, setName] = useState(user?.fullName ?? "");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const initials = getInitials(user?.fullName);
  const isFormValid = name.trim() !== "";

  const handleSave = async () => {
    if (!isFormValid) return;

    setLoading(true);
    setError("");
    try {
      const data = await apiPatch(
        "/users/me/account",
        {
          fullName: name,
          ...(password.trim() !== "" ? { newPassword: password } : {}),
        },
        token ?? undefined,
      );

      if (token) {
        setAuth(token, { ...user, ...data });
      }
      setPassword("");
    } catch (err: any) {
      setError(err.message || "Failed to save changes");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader title="My Account" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        <View style={styles.avatarWrap}>
          <View style={styles.avatar}>
            <AppText color="#FFFFFF" size={24} weight="bold">
              {initials}
            </AppText>
          </View>
          <Pressable style={styles.editBadge}>
            <Feather name="camera" size={14} color="#FFFFFF" />
          </Pressable>
        </View>

        <View style={styles.field}>
          <AppText size={13} weight="medium" color="#61685c">
            Username
          </AppText>
          <TextInput value={name} onChangeText={setName} style={styles.input} />
        </View>

        <View style={styles.field}>
          <AppText size={13} weight="medium" color="#61685c">
            New password
          </AppText>
          <TextInput
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            placeholder="Leave blank to keep current password"
            placeholderTextColor="#9CA3AF"
            secureTextEntry
          />
        </View>

        {error !== "" && (
          <AppText color="#E4572E" size={14} style={{ marginBottom: 10 }}>
            {error}
          </AppText>
        )}

        <Button
          label="Save changes"
          onPress={handleSave}
          loading={loading}
          disabled={!isFormValid}
          style={styles.saveButton}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF", paddingHorizontal: 10 },
  scroll: { paddingTop: 4, paddingBottom: 40 },
  avatarWrap: { alignSelf: "center", marginVertical: 20 },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#2F5233",
    alignItems: "center",
    justifyContent: "center",
  },
  editBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#5EAD1D",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  field: { marginBottom: 18, gap: 8 },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#E2E6DF",
    borderRadius: 12,
    paddingHorizontal: 14,
    fontSize: 15,
    fontFamily: "Poppins-Regular",
    color: "#1F2937",
  },
  saveButton: { alignSelf: "stretch", marginTop: 10 },
});
