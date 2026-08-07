// app/(tabs)/profile.tsx
import AppText from "@/components/AppText";
import ProfileMenuRow from "@/components/profile/ProfileMenuRow";
import { useThemeStore } from "@/store/themeStore";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Image, ScrollView, StyleSheet, Switch, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// dummy user data — swap for real auth/user state later
const user = {
  name: "Daniel Jones",
  email: "danieljones@example.com",
  isPremium: true,
  avatar: require("@/assets/images/avatar.png"),
};

export default function ProfileScreen() {
  const mode = useThemeStore((s) => s.mode);
  const setMode = useThemeStore((s) => s.setMode);

  const isDark = mode === "dark";

  return (
    <SafeAreaView style={styles.container}>
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
          <Image source={user.avatar} style={styles.avatar} />

          <View style={{ flex: 1 }}>
            <AppText size={17} weight="bold" color="#363a33">
              {user.name}
            </AppText>
            <AppText size={13} color="#61685c">
              {user.email}
            </AppText>

            {user.isPremium && (
              <View style={styles.premiumBadge}>
                <MaterialIcons name="stars" size={14} color="#B8860B" />
                <AppText size={12} weight="medium" color="#B8860B">
                  Premium
                </AppText>
              </View>
            )}
          </View>
        </View>

        {/* General */}
        <AppText
          size={13}
          weight="medium"
          color="#61685c"
          style={styles.sectionLabel}
        >
          General
        </AppText>

        <View style={styles.section}>
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
          color="#61685c"
          style={styles.sectionLabel}
        >
          Theme
        </AppText>

        <View style={styles.section}>
          <View style={styles.themeRow}>
            <View style={styles.left}>
              <View style={styles.iconWrap}>
                <Feather name="moon" size={18} color="#61685c" />
              </View>
              <AppText size={15} weight="medium" color="#363a33">
                Dark mode
              </AppText>
            </View>

            <Switch
              value={isDark}
              onValueChange={(value) => setMode(value ? "dark" : "light")}
              trackColor={{ true: "#5EAD1D", false: "#E2E6DF" }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
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
  premiumBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#FFF7E6",
    alignSelf: "flex-start",
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginTop: 6,
  },
  sectionLabel: {
    marginBottom: 6,
    marginTop: 4,
  },
  section: {
    borderWidth: 1,
    borderColor: "#E2E6DF",
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
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  iconWrap: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#F4F7F2",
    alignItems: "center",
    justifyContent: "center",
  },
});
