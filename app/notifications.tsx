import AppText from "@/components/AppText";
import NotificationCard, {
    type NotificationItem,
} from "@/components/notifications/NotificationCard";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { FlatList, Pressable, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const NEW_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "1",
    title: "Order Out for Delivery!",
    message:
      "Your food is on the move! Track your order for real-time updates.",
    time: "5 mins ago",
  },
  {
    id: "2",
    title: "Your Order is Confirmed!",
    message:
      "Thanks for ordering! Your delicious meal is being prepared and will be on its way soon.",
    time: "22 mins ago",
  },
];

const OLD_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "3",
    title: "Order Delivered",
    message: "Your order was delivered. Enjoy your meal!",
    time: "2 days ago",
  },
];

type TabKey = "new" | "old";

export default function NotificationsScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabKey>("new");

  const data = activeTab === "new" ? NEW_NOTIFICATIONS : OLD_NOTIFICATIONS;

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable
          onPress={() => router.back()}
          hitSlop={12}
          style={styles.backButton}
        >
          <Feather name="arrow-left" size={22} color="#1F2937" />
        </Pressable>

        <View style={styles.titleWrapper}>
          <Feather name="bell" size={18} color="#1F2937" />
          <AppText size={17} weight="bold" color="#1F2937">
            Notification
          </AppText>
        </View>

        {/* spacer to keep title visually centered against the back button */}
        <View style={styles.backButton} />
      </View>

      {/* Segmented tabs */}
      <View style={styles.tabRow}>
        <Pressable
          style={[styles.tab, activeTab === "new" && styles.activeTab]}
          onPress={() => setActiveTab("new")}
        >
          <View style={styles.tabLabelRow}>
            <AppText
              size={14}
              weight="semibold"
              color={activeTab === "new" ? "#1F2937" : "#9CA3AF"}
            >
              New
            </AppText>
            {NEW_NOTIFICATIONS.length > 0 && <View style={styles.dot} />}
          </View>
        </Pressable>

        <Pressable
          style={[styles.tab, activeTab === "old" && styles.activeTab]}
          onPress={() => setActiveTab("old")}
        >
          <AppText
            size={14}
            weight="semibold"
            color={activeTab === "old" ? "#1F2937" : "#9CA3AF"}
          >
            Old
          </AppText>
        </Pressable>
      </View>

      {/* List */}
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => <NotificationCard {...item} />}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingTop: 15,
    paddingHorizontal: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 8,
  },
  backButton: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  titleWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  tabRow: {
    flexDirection: "row",
    backgroundColor: "#F1F3EE",
    borderRadius: 14,
    padding: 4,
    marginTop: 20,
  },
  tab: {
    flex: 1,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  activeTab: {
    backgroundColor: "#FFFFFF",
  },
  tabLabelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#EF4444",
  },
  listContent: {
    paddingTop: 20,
    paddingBottom: 24,
  },
  separator: {
    height: 20,
  },
});
