import { useIsTablet } from "@/hooks/useIsTablet";
import { useCartStore } from "@/store/cartStore";
import { Feather, Octicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

const ACTIVE_COLOR = "#4CAF50";
const INACTIVE_COLOR = "#9CA3AF";

function CartTabIcon({ color, focused }: { color: string; focused: boolean }) {
  const itemCount = useCartStore((s) =>
    s.items.reduce((sum, i) => sum + i.quantity, 0),
  );

  return (
    <View style={styles.iconWrapper}>
      <View>
        <Feather name="shopping-cart" size={24} color={color} />

        {itemCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {itemCount > 9 ? "9+" : itemCount}
            </Text>
          </View>
        )}
      </View>

      {focused && <View style={styles.activeDot} />}
    </View>
  );
}

export default function TabsLayout() {
  const isTablet = useIsTablet();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: ACTIVE_COLOR,
        tabBarInactiveTintColor: INACTIVE_COLOR,
        tabBarStyle: [styles.tabBar, isTablet && { height: 100 }],
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.iconWrapper}>
              <Feather name="home" size={24} color={color} />
              {focused && <View style={styles.activeDot} />}
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
              {focused && <View style={styles.activeDot} />}
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
              {focused && <View style={styles.activeDot} />}
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
              {focused && <View style={styles.activeDot} />}
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
    borderTopColor: "#F0F0F0",
    backgroundColor: "#FFFFFF",
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
    backgroundColor: ACTIVE_COLOR,
  },
  // notificationDot: {
  //   position: "absolute",
  //   top: -2,
  //   right: -4,
  //   width: 8,
  //   height: 8,
  //   borderRadius: 4,
  //   backgroundColor: "#EF4444",
  //   borderWidth: 1.5,
  //   borderColor: "#FFFFFF",
  // },
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
    borderColor: "#FFFFFF",
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
