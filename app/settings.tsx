// import AppText from "@/components/AppText";
// import ProfileMenuRow from "@/components/profile/ProfileMenuRow";
// import ConfirmModal from "@/components/ui/ConfirmModal";
// import ScreenHeader from "@/components/ui/ScreenHeader";
// import { useAuthStore } from "@/store/authStore";
// import { useCartStore } from "@/store/cartStore";
// import { useFavoritesStore } from "@/store/favoritesStore";
// import { useOrdersStore } from "@/store/ordersStore";
// import { useThemeStore } from "@/store/themeStore";
// import { Feather } from "@expo/vector-icons";
// import { useRouter } from "expo-router";
// import { useState } from "react";
// import { Pressable, ScrollView, StyleSheet, Switch, View } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";

// type ModalType = "logout" | "delete" | null;

// export default function SettingsScreen() {
//   const router = useRouter();
//   const mode = useThemeStore((s) => s.mode);
//   const setMode = useThemeStore((s) => s.setMode);
//   const isDark = mode === "dark";

//   const logout = useAuthStore((s) => s.logout);

//   const [modal, setModal] = useState<ModalType>(null);

//   const handleConfirm = () => {
//     if (modal === "logout") {
//       logout();
//       useCartStore.setState({ items: [] });
//       useOrdersStore.setState({ orders: [] });
//       useFavoritesStore.setState({ items: [] });
//       router.replace("/(auth)/login");
//     }

//     if (modal === "delete") {
//       // TODO: call a real delete-account API endpoint once it exists,
//       // then run the same local-state clearing as logout above
//     }

//     setModal(null);
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScreenHeader title="Settings" />

//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={styles.scroll}
//       >
//         <AppText
//           size={13}
//           weight="medium"
//           color="#61685c"
//           style={styles.sectionLabel}
//         >
//           General
//         </AppText>

//         <View style={styles.section}>
//           <ProfileMenuRow
//             icon="refresh-cw"
//             label="Switch Account"
//             onPress={() => {}}
//           />

//           <View style={styles.row}>
//             <View style={styles.left}>
//               <View style={styles.iconWrap}>
//                 <Feather name="globe" size={18} color="#61685c" />
//               </View>
//               <AppText size={15} weight="medium" color="#363a33">
//                 Language
//               </AppText>
//             </View>
//             <View style={styles.rowRight}>
//               <AppText size={14} color="#9CA3AF">
//                 English
//               </AppText>
//               <Feather name="chevron-right" size={18} color="#9CA3AF" />
//             </View>
//           </View>

//           <View style={[styles.row, styles.lastRow]}>
//             <View style={styles.left}>
//               <View style={styles.iconWrap}>
//                 <Feather name="moon" size={18} color="#61685c" />
//               </View>
//               <AppText size={15} weight="medium" color="#363a33">
//                 Dark mode
//               </AppText>
//             </View>
//             <Switch
//               value={isDark}
//               onValueChange={(value) => setMode(value ? "dark" : "light")}
//               trackColor={{ true: "#5EAD1D", false: "#E2E6DF" }}
//             />
//           </View>
//         </View>

//         <AppText
//           size={13}
//           weight="medium"
//           color="#61685c"
//           style={styles.sectionLabel}
//         >
//           Danger Actions
//         </AppText>

//         <View style={styles.section}>
//           <Pressable style={styles.row} onPress={() => setModal("delete")}>
//             <View style={styles.left}>
//               <View style={styles.iconWrap}>
//                 <Feather name="trash-2" size={18} color="#E4572E" />
//               </View>
//               <AppText size={15} weight="medium" color="#E4572E">
//                 Delete Account
//               </AppText>
//             </View>
//             <Feather name="chevron-right" size={18} color="#E4572E" />
//           </Pressable>

//           <Pressable
//             style={[styles.row, styles.lastRow]}
//             onPress={() => setModal("logout")}
//           >
//             <View style={styles.left}>
//               <View style={styles.iconWrap}>
//                 <Feather name="log-out" size={18} color="#E4572E" />
//               </View>
//               <AppText size={15} weight="medium" color="#E4572E">
//                 Log out
//               </AppText>
//             </View>
//             <Feather name="chevron-right" size={18} color="#E4572E" />
//           </Pressable>
//         </View>
//       </ScrollView>

//       <ConfirmModal
//         visible={modal !== null}
//         title="Are you sure?"
//         message={
//           modal === "delete"
//             ? "Are you sure you want to permanently delete your account? This can't be undone."
//             : "Are you sure you want to log out from this account?"
//         }
//         confirmLabel={modal === "delete" ? "Delete" : "Log out"}
//         onConfirm={handleConfirm}
//         onCancel={() => setModal(null)}
//       />
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#FFFFFF", paddingHorizontal: 10 },
//   scroll: { paddingBottom: 40, paddingTop: 4 },
//   sectionLabel: { marginBottom: 6, marginTop: 4 },
//   section: {
//     borderWidth: 1,
//     borderColor: "#E2E6DF",
//     borderRadius: 16,
//     paddingHorizontal: 14,
//     marginBottom: 24,
//   },
//   row: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     paddingVertical: 14,
//     borderBottomWidth: 1,
//     borderBottomColor: "#F1F3EE",
//   },
//   lastRow: { borderBottomWidth: 0 },
//   left: { flexDirection: "row", alignItems: "center", gap: 14 },
//   rowRight: { flexDirection: "row", alignItems: "center", gap: 6 },
//   iconWrap: {
//     width: 34,
//     height: 34,
//     borderRadius: 17,
//     backgroundColor: "#F4F7F2",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });

import AppText from "@/components/AppText";
import ProfileMenuRow from "@/components/profile/ProfileMenuRow";
import ConfirmModal from "@/components/ui/ConfirmModal";
import ScreenHeader from "@/components/ui/ScreenHeader";
import { useAuthStore } from "@/store/authStore";
import { useCartStore } from "@/store/cartStore";
import { useFavoritesStore } from "@/store/favoritesStore";
import { useOrdersStore } from "@/store/ordersStore";
import { useThemeStore } from "@/store/themeStore";
import { useTheme } from "@/theme/ThemeProvider";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Switch, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type ModalType = "logout" | "delete" | null;

export default function SettingsScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const mode = useThemeStore((s) => s.mode);
  const setMode = useThemeStore((s) => s.setMode);
  const isDark = mode === "dark";

  const logout = useAuthStore((s) => s.logout);

  const [modal, setModal] = useState<ModalType>(null);

  const handleConfirm = () => {
    if (modal === "logout") {
      logout();
      useCartStore.setState({ items: [] });
      useOrdersStore.setState({ orders: [] });
      useFavoritesStore.setState({ items: [] });
      router.replace("/(auth)/login");
    }

    if (modal === "delete") {
      // TODO: call a real delete-account API endpoint once it exists,
      // then run the same local-state clearing as logout above
    }

    setModal(null);
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <ScreenHeader title="Settings" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
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
            icon="refresh-cw"
            label="Switch Account"
            onPress={() => {}}
          />

          <View style={[styles.row, { borderBottomColor: colors.border }]}>
            <View style={styles.left}>
              <View
                style={[styles.iconWrap, { backgroundColor: colors.surface }]}
              >
                <Feather name="globe" size={18} color={colors.textMuted} />
              </View>
              <AppText size={15} weight="medium" color={colors.text}>
                Language
              </AppText>
            </View>
            <View style={styles.rowRight}>
              <AppText size={14} color={colors.textFaint}>
                English
              </AppText>
              <Feather
                name="chevron-right"
                size={18}
                color={colors.textFaint}
              />
            </View>
          </View>

          <View style={[styles.row, styles.lastRow]}>
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

        <AppText
          size={13}
          weight="medium"
          color={colors.textMuted}
          style={styles.sectionLabel}
        >
          Danger Actions
        </AppText>

        <View style={[styles.section, { borderColor: colors.border }]}>
          <Pressable
            style={[styles.row, { borderBottomColor: colors.border }]}
            onPress={() => setModal("delete")}
          >
            <View style={styles.left}>
              <View
                style={[styles.iconWrap, { backgroundColor: colors.surface }]}
              >
                <Feather name="trash-2" size={18} color={colors.danger} />
              </View>
              <AppText size={15} weight="medium" color={colors.danger}>
                Delete Account
              </AppText>
            </View>
            <Feather name="chevron-right" size={18} color={colors.danger} />
          </Pressable>

          <Pressable
            style={[styles.row, styles.lastRow]}
            onPress={() => setModal("logout")}
          >
            <View style={styles.left}>
              <View
                style={[styles.iconWrap, { backgroundColor: colors.surface }]}
              >
                <Feather name="log-out" size={18} color={colors.danger} />
              </View>
              <AppText size={15} weight="medium" color={colors.danger}>
                Log out
              </AppText>
            </View>
            <Feather name="chevron-right" size={18} color={colors.danger} />
          </Pressable>
        </View>
      </ScrollView>

      <ConfirmModal
        visible={modal !== null}
        title="Are you sure?"
        message={
          modal === "delete"
            ? "Are you sure you want to permanently delete your account? This can't be undone."
            : "Are you sure you want to log out from this account?"
        }
        confirmLabel={modal === "delete" ? "Delete" : "Log out"}
        onConfirm={handleConfirm}
        onCancel={() => setModal(null)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 10 },
  scroll: { paddingBottom: 40, paddingTop: 4 },
  sectionLabel: { marginBottom: 6, marginTop: 4 },
  section: {
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 14,
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  lastRow: { borderBottomWidth: 0 },
  left: { flexDirection: "row", alignItems: "center", gap: 14 },
  rowRight: { flexDirection: "row", alignItems: "center", gap: 6 },
  iconWrap: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
  },
});
