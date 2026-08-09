// import AppText from "@/components/AppText";
// import EmptyOrders from "@/components/orders/EmptyOrders";
// import OrderCard from "@/components/orders/OrderCard";
// import ScreenHeader from "@/components/ui/ScreenHeader";
// import { useOrdersStore } from "@/store/ordersStore";
// import { useMemo, useState } from "react";
// import { FlatList, Pressable, StyleSheet, View } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";

// type TabKey = "current" | "previous";

// export default function MyOrdersScreen() {
//   const [activeTab, setActiveTab] = useState<TabKey>("current");

//   const orders = useOrdersStore((s) => s.orders);

//   const currentOrders = useMemo(
//     () => orders.filter((o) => o.status === "current"),
//     [orders],
//   );
//   const previousOrders = useMemo(
//     () => orders.filter((o) => o.status === "previous"),
//     [orders],
//   );

//   const hasAnyOrders = currentOrders.length > 0 || previousOrders.length > 0;
//   const data = activeTab === "current" ? currentOrders : previousOrders;

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScreenHeader title="My Orders" rightIcon="more-vertical" />

//       {!hasAnyOrders ? (
//         <EmptyOrders />
//       ) : (
//         <>
//           <View style={styles.tabRow}>
//             <Pressable
//               style={[styles.tab, activeTab === "current" && styles.activeTab]}
//               onPress={() => setActiveTab("current")}
//             >
//               <AppText
//                 size={14}
//                 weight="semibold"
//                 color={activeTab === "current" ? "#1F2937" : "#9CA3AF"}
//               >
//                 Current
//               </AppText>
//               {currentOrders.length > 0 && <View style={styles.dot} />}
//             </Pressable>

//             <Pressable
//               style={[styles.tab, activeTab === "previous" && styles.activeTab]}
//               onPress={() => setActiveTab("previous")}
//             >
//               <AppText
//                 size={14}
//                 weight="semibold"
//                 color={activeTab === "previous" ? "#1F2937" : "#9CA3AF"}
//               >
//                 Previous
//               </AppText>
//             </Pressable>
//           </View>

//           <FlatList
//             data={data}
//             keyExtractor={(item) => item.id}
//             contentContainerStyle={styles.listContent}
//             ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
//             renderItem={({ item }) => <OrderCard order={item} />}
//             ListEmptyComponent={
//               <AppText size={14} color="#9CA3AF" style={styles.noOrdersText}>
//                 No {activeTab} orders yet.
//               </AppText>
//             }
//           />
//         </>
//       )}
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#FFFFFF", paddingHorizontal: 10 },
//   tabRow: {
//     flexDirection: "row",
//     backgroundColor: "#F1F3EE",
//     borderRadius: 14,
//     padding: 4,
//     marginTop: 10,
//     marginBottom: 20,
//   },
//   tab: {
//     flex: 1,
//     height: 40,
//     borderRadius: 10,
//     alignItems: "center",
//     justifyContent: "center",
//     flexDirection: "row",
//     gap: 6,
//   },
//   activeTab: { backgroundColor: "#FFFFFF" },
//   dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: "#EF4444" },
//   listContent: { paddingBottom: 40 },
//   noOrdersText: { textAlign: "center", marginTop: 40 },
// });

import AppText from "@/components/AppText";
import EmptyOrders from "@/components/orders/EmptyOrders";
import OrderCard from "@/components/orders/OrderCard";
import ScreenHeader from "@/components/ui/ScreenHeader";
import { useOrdersStore } from "@/store/ordersStore";
import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type TabKey = "current" | "previous";

export default function MyOrdersScreen() {
  const [activeTab, setActiveTab] = useState<TabKey>("current");
  const [loading, setLoading] = useState(true);

  const orders = useOrdersStore((s) => s.orders);
  const hydrateOrders = useOrdersStore((s) => s.hydrateOrders);

  useEffect(() => {
    hydrateOrders().finally(() => setLoading(false));
  }, []);

  const currentOrders = useMemo(
    () => orders.filter((o) => o.status === "current"),
    [orders],
  );
  const previousOrders = useMemo(
    () => orders.filter((o) => o.status === "previous"),
    [orders],
  );

  const hasAnyOrders = currentOrders.length > 0 || previousOrders.length > 0;
  const data = activeTab === "current" ? currentOrders : previousOrders;

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ScreenHeader title="My Orders" rightIcon="more-vertical" />
        <View style={styles.centered}>
          <ActivityIndicator size="small" color="#5EAD1D" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader title="My Orders" rightIcon="more-vertical" />

      {!hasAnyOrders ? (
        <EmptyOrders />
      ) : (
        <>
          <View style={styles.tabRow}>
            <Pressable
              style={[styles.tab, activeTab === "current" && styles.activeTab]}
              onPress={() => setActiveTab("current")}
            >
              <AppText
                size={14}
                weight="semibold"
                color={activeTab === "current" ? "#1F2937" : "#9CA3AF"}
              >
                Current
              </AppText>
              {currentOrders.length > 0 && <View style={styles.dot} />}
            </Pressable>

            <Pressable
              style={[styles.tab, activeTab === "previous" && styles.activeTab]}
              onPress={() => setActiveTab("previous")}
            >
              <AppText
                size={14}
                weight="semibold"
                color={activeTab === "previous" ? "#1F2937" : "#9CA3AF"}
              >
                Previous
              </AppText>
            </Pressable>
          </View>

          <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
            renderItem={({ item }) => <OrderCard order={item} />}
            ListEmptyComponent={
              <AppText size={14} color="#9CA3AF" style={styles.noOrdersText}>
                No {activeTab} orders yet.
              </AppText>
            }
          />
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF", paddingHorizontal: 10 },
  tabRow: {
    flexDirection: "row",
    backgroundColor: "#F1F3EE",
    borderRadius: 14,
    padding: 4,
    marginTop: 10,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 6,
  },
  activeTab: { backgroundColor: "#FFFFFF" },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: "#EF4444" },
  listContent: { paddingBottom: 40 },
  noOrdersText: { textAlign: "center", marginTop: 40 },
  centered: { flex: 1, alignItems: "center", justifyContent: "center" },
});
