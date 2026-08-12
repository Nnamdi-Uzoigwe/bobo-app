import { useIsTablet } from "@/hooks/useIsTablet";
import { useAuthStore } from "@/store/authStore";
import { useCartStore } from "@/store/cartStore";
import { useTheme } from "@/theme/ThemeProvider";
import { Feather, Octicons } from "@expo/vector-icons";
import { Redirect, Tabs } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

function CartTabIcon({ color, focused }: { color: string; focused: boolean }) {
  const { colors } = useTheme();
  const itemCount = useCartStore((s) =>
    s.items.reduce((sum, i) => sum + i.quantity, 0),
  );

  return (
    <View style={styles.iconWrapper}>
      <View>
        <Feather name="shopping-cart" size={24} color={color} />

        {itemCount > 0 && (
          <View style={[styles.badge, { borderColor: colors.background }]}>
            <Text style={styles.badgeText}>
              {itemCount > 9 ? "9+" : itemCount}
            </Text>
          </View>
        )}
      </View>

      {focused && (
        <View style={[styles.activeDot, { backgroundColor: colors.primary }]} />
      )}
    </View>
  );
}

export default function TabsLayout() {
  const isTablet = useIsTablet();
  const token = useAuthStore((s) => s.token);
  const user = useAuthStore((s) => s.user);
  const { colors } = useTheme();

  if (!token) {
    return <Redirect href="/(auth)/login" />;
  }

  if (!user?.fullName) {
    return <Redirect href="/(auth)/create-profile" />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textFaint,
        tabBarStyle: [
          styles.tabBar,
          {
            backgroundColor: colors.background,
            borderTopColor: colors.border,
          },
          isTablet && { height: 100 },
        ],
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.iconWrapper}>
              <Feather name="home" size={24} color={color} />
              {focused && (
                <View
                  style={[
                    styles.activeDot,
                    { backgroundColor: colors.primary },
                  ]}
                />
              )}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.iconWrapper}>
              <Feather name="compass" size={24} color={color} />
              {focused && (
                <View
                  style={[
                    styles.activeDot,
                    { backgroundColor: colors.primary },
                  ]}
                />
              )}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <CartTabIcon color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.iconWrapper}>
              <Octicons name="heart" size={24} color={color} />
              {focused && (
                <View
                  style={[
                    styles.activeDot,
                    { backgroundColor: colors.primary },
                  ]}
                />
              )}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.iconWrapper}>
              <View>
                <Feather name="user" size={24} color={color} />
              </View>
              {focused && (
                <View
                  style={[
                    styles.activeDot,
                    { backgroundColor: colors.primary },
                  ]}
                />
              )}
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 80,
    paddingTop: 10,
    paddingBottom: 8,
    borderTopWidth: 1,
    elevation: 0,
    shadowOpacity: 0,
  },
  iconWrapper: {
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  activeDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
  },
  badge: {
    position: "absolute",
    top: -6,
    right: -10,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    paddingHorizontal: 3,
    backgroundColor: "#EF4444",
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 9,
    fontWeight: "700",
    lineHeight: 11,
  },
});
