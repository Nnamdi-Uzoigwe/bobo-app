import AppText from "@/components/AppText";
import ProfileMenuRow from "@/components/profile/ProfileMenuRow";
import { useAuthStore } from "@/store/authStore";
import { useThemeStore } from "@/store/themeStore";
import { useTheme } from "@/theme/ThemeProvider";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { Image, ScrollView, StyleSheet, Switch, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function getInitials(fullName?: string): string {
  if (!fullName) return "?";
  const parts = fullName.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return parts[0].slice(0, 2).toUpperCase();
}

export default function ProfileScreen() {
  const user = useAuthStore((s) => s.user);
  const mode = useThemeStore((s) => s.mode);
  const setMode = useThemeStore((s) => s.setMode);
  const { colors } = useTheme();

  const isDark = mode === "dark";
  const initials = getInitials(user?.fullName);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {/* Top bar */}
        <View style={styles.topBar}>
          <Image source={require("@/assets/images/app-logo.png")} />
          <View style={{ width: 22 }} />
        </View>

        {/* User card */}
        <View style={styles.userCard}>
          {user?.avatarUrl ? (
            <Image source={{ uri: user.avatarUrl }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarFallback}>
              <AppText color="#FFFFFF" size={18} weight="bold">
                {initials}
              </AppText>
            </View>
          )}

          <View style={{ flex: 1 }}>
            <AppText size={17} weight="bold" color={colors.text}>
              {user?.fullName ?? "Your Name"}
            </AppText>
            <AppText size={13} color={colors.textMuted}>
              {user?.email ?? ""}
            </AppText>
          </View>
        </View>

        {/* General */}
        <AppText
          size={13}
          weight="medium"
          color={colors.textMuted}
          style={styles.sectionLabel}
        >
          General
        </AppText>

        <View style={[styles.section, { borderColor: colors.border }]}>
          <ProfileMenuRow
            icon="user"
            label="My Account"
            onPress={() => router.push("/my-account")}
          />
          <ProfileMenuRow
            icon="list"
            label="My Orders"
            onPress={() => router.push("/orders")}
          />
          <ProfileMenuRow
            icon="map-pin"
            label="Addresses"
            onPress={() => router.push("/addresses")}
          />
          <ProfileMenuRow
            icon="credit-card"
            label="Payment"
            onPress={() => router.push("/payment")}
          />
          <ProfileMenuRow
            icon="refresh-cw"
            label="Subscription"
            onPress={() => router.push("/subscription")}
          />
          <ProfileMenuRow
            icon="settings"
            label="Settings"
            onPress={() => router.push("/settings")}
          />
        </View>

        {/* Theme */}
        <AppText
          size={13}
          weight="medium"
          color={colors.textMuted}
          style={styles.sectionLabel}
        >
          Theme
        </AppText>

        <View style={[styles.section, { borderColor: colors.border }]}>
          <View style={styles.themeRow}>
            <View style={styles.left}>
              <View
                style={[styles.iconWrap, { backgroundColor: colors.surface }]}
              >
                <Feather name="moon" size={18} color={colors.textMuted} />
              </View>
              <AppText size={15} weight="medium" color={colors.text}>
                Dark mode
              </AppText>
            </View>

            <Switch
              value={isDark}
              onValueChange={(value) => setMode(value ? "dark" : "light")}
              trackColor={{ true: colors.primary, false: colors.border }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { paddingHorizontal: 10, paddingBottom: 40 },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  userCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginBottom: 24,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#F4F7F2",
  },
  avatarFallback: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#2F5233",
    alignItems: "center",
    justifyContent: "center",
  },
  sectionLabel: { marginBottom: 6, marginTop: 4 },
  section: {
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 14,
    marginBottom: 24,
  },
  themeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
  },
  left: { flexDirection: "row", alignItems: "center", gap: 14 },
  iconWrap: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
  },
});
