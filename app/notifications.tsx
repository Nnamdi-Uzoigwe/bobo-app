// import AppText from "@/components/AppText";
// import NotificationCard, {
//   type NotificationItem,
// } from "@/components/notifications/NotificationCard";
// import { apiGet } from "@/lib/api";
// import { useAuthStore } from "@/store/authStore";
// import { Feather } from "@expo/vector-icons";
// import { useRouter } from "expo-router";
// import { useEffect, useMemo, useState } from "react";
// import {
//   ActivityIndicator,
//   FlatList,
//   Pressable,
//   StyleSheet,
//   View,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";

// type TabKey = "new" | "old";

// function timeAgo(dateString: string): string {
//   const diffMs = Date.now() - new Date(dateString).getTime();
//   const minutes = Math.floor(diffMs / 60000);
//   if (minutes < 1) return "just now";
//   if (minutes < 60) return `${minutes} mins ago`;
//   const hours = Math.floor(minutes / 60);
//   if (hours < 24) return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
//   const days = Math.floor(hours / 24);
//   return `${days} ${days === 1 ? "day" : "days"} ago`;
// }

// export default function NotificationsScreen() {
//   const router = useRouter();
//   const token = useAuthStore((s) => s.token);
//   const [activeTab, setActiveTab] = useState<TabKey>("new");
//   const [raw, setRaw] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     let isMounted = true;

//     async function load() {
//       try {
//         const data = await apiGet("/notifications", token ?? undefined);
//         if (isMounted) setRaw(data);
//       } catch (err) {
//         console.error("Failed to load notifications:", err);
//       } finally {
//         if (isMounted) setLoading(false);
//       }
//     }

//     load();
//     return () => {
//       isMounted = false;
//     };
//   }, []);

//   const newNotifications: NotificationItem[] = useMemo(
//     () =>
//       raw
//         .filter((n) => !n.read)
//         .map((n) => ({
//           id: n._id,
//           title: n.title,
//           message: n.message,
//           time: timeAgo(n.createdAt),
//         })),
//     [raw],
//   );

//   const oldNotifications: NotificationItem[] = useMemo(
//     () =>
//       raw
//         .filter((n) => n.read)
//         .map((n) => ({
//           id: n._id,
//           title: n.title,
//           message: n.message,
//           time: timeAgo(n.createdAt),
//         })),
//     [raw],
//   );

//   const data = activeTab === "new" ? newNotifications : oldNotifications;

//   return (
//     <SafeAreaView style={styles.container} edges={["top"]}>
//       {/* Header */}
//       <View style={styles.header}>
//         <Pressable
//           onPress={() => router.back()}
//           hitSlop={12}
//           style={styles.backButton}
//         >
//           <Feather name="arrow-left" size={22} color="#1F2937" />
//         </Pressable>

//         <View style={styles.titleWrapper}>
//           <Feather name="bell" size={18} color="#1F2937" />
//           <AppText size={17} weight="bold" color="#1F2937">
//             Notification
//           </AppText>
//         </View>

//         <View style={styles.backButton} />
//       </View>

//       {/* Segmented tabs */}
//       <View style={styles.tabRow}>
//         <Pressable
//           style={[styles.tab, activeTab === "new" && styles.activeTab]}
//           onPress={() => setActiveTab("new")}
//         >
//           <View style={styles.tabLabelRow}>
//             <AppText
//               size={14}
//               weight="semibold"
//               color={activeTab === "new" ? "#1F2937" : "#9CA3AF"}
//             >
//               New
//             </AppText>
//             {newNotifications.length > 0 && <View style={styles.dot} />}
//           </View>
//         </Pressable>

//         <Pressable
//           style={[styles.tab, activeTab === "old" && styles.activeTab]}
//           onPress={() => setActiveTab("old")}
//         >
//           <AppText
//             size={14}
//             weight="semibold"
//             color={activeTab === "old" ? "#1F2937" : "#9CA3AF"}
//           >
//             Old
//           </AppText>
//         </Pressable>
//       </View>

//       {/* List */}
//       {loading ? (
//         <View style={styles.centered}>
//           <ActivityIndicator size="small" color="#5EAD1D" />
//         </View>
//       ) : (
//         <FlatList
//           data={data}
//           keyExtractor={(item) => item.id}
//           contentContainerStyle={styles.listContent}
//           ItemSeparatorComponent={() => <View style={styles.separator} />}
//           renderItem={({ item }) => <NotificationCard {...item} />}
//           showsVerticalScrollIndicator={false}
//           ListEmptyComponent={
//             <AppText size={14} color="#9CA3AF" style={styles.emptyText}>
//               No {activeTab} notifications.
//             </AppText>
//           }
//         />
//       )}
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#FFFFFF",
//     paddingHorizontal: 20,
//   },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     paddingTop: 8,
//   },
//   backButton: {
//     width: 32,
//     height: 32,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   titleWrapper: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 6,
//   },
//   tabRow: {
//     flexDirection: "row",
//     backgroundColor: "#F1F3EE",
//     borderRadius: 14,
//     padding: 4,
//     marginTop: 20,
//   },
//   tab: {
//     flex: 1,
//     height: 40,
//     borderRadius: 10,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   activeTab: {
//     backgroundColor: "#FFFFFF",
//   },
//   tabLabelRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 6,
//   },
//   dot: {
//     width: 6,
//     height: 6,
//     borderRadius: 3,
//     backgroundColor: "#EF4444",
//   },
//   listContent: {
//     paddingTop: 20,
//     paddingBottom: 24,
//   },
//   separator: {
//     height: 20,
//   },
//   centered: {
//     marginTop: 60,
//     alignItems: "center",
//   },
//   emptyText: {
//     textAlign: "center",
//     marginTop: 40,
//   },
// });
import AppText from "@/components/AppText";
import NotificationCard, {
  type NotificationItem,
} from "@/components/notifications/NotificationCard";
import { useNotificationsStore } from "@/store/notificationsStore";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type TabKey = "new" | "old";

function timeAgo(dateString: string): string {
  const diffMs = Date.now() - new Date(dateString).getTime();
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes} mins ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  const days = Math.floor(hours / 24);
  return `${days} ${days === 1 ? "day" : "days"} ago`;
}

export default function NotificationsScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabKey>("new");
  const [loading, setLoading] = useState(true);

  const notifications = useNotificationsStore((s) => s.notifications);
  const hydrateNotifications = useNotificationsStore(
    (s) => s.hydrateNotifications,
  );
  const markRead = useNotificationsStore((s) => s.markRead);

  useEffect(() => {
    hydrateNotifications().finally(() => setLoading(false));
  }, []);

  const newNotifications: NotificationItem[] = useMemo(
    () =>
      notifications
        .filter((n) => !n.read)
        .map((n) => ({
          id: n._id,
          title: n.title,
          message: n.message,
          time: timeAgo(n.createdAt),
        })),
    [notifications],
  );

  const oldNotifications: NotificationItem[] = useMemo(
    () =>
      notifications
        .filter((n) => n.read)
        .map((n) => ({
          id: n._id,
          title: n.title,
          message: n.message,
          time: timeAgo(n.createdAt),
        })),
    [notifications],
  );

  const data = activeTab === "new" ? newNotifications : oldNotifications;

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
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

        <View style={styles.backButton} />
      </View>

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
            {newNotifications.length > 0 && <View style={styles.dot} />}
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

      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="small" color="#5EAD1D" />
        </View>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={({ item }) => (
            <NotificationCard {...item} onPress={() => markRead(item.id)} />
          )}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <AppText size={14} color="#9CA3AF" style={styles.emptyText}>
              No {activeTab} notifications.
            </AppText>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
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
  centered: {
    marginTop: 60,
    alignItems: "center",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 40,
  },
});
