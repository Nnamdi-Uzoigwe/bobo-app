// import Banner from "@/components/home/Banner";
// import HomeHeader from "@/components/home/HomeHeader";
// import MenuList from "@/components/home/MenuList";
// import SearchBar from "@/components/home/SearchBar";
// import SearchOverlay from "@/components/home/SearchOverlay";
// import TabNavigation from "@/components/home/TabNavigation";
// import { useCartStore } from "@/store/cartStore";
// import { useFavoritesStore } from "@/store/favoritesStore";
// import { useMenuStore } from "@/store/menuStore";
// import { useNotificationsStore } from "@/store/notificationsStore";
// import { useEffect, useState } from "react";
// import { ScrollView, StatusBar, StyleSheet } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";

// export default function Home() {
//   const [category, setCategory] = useState("All");
//   const [search, setSearch] = useState("");
//   const [isSearchFocused, setIsSearchFocused] = useState(false);
//   const hydrateCart = useCartStore((s) => s.hydrateCart);
//   const hydrateFavorites = useFavoritesStore((s) => s.hydrateFavorites);
//   const hydrateNotifications = useNotificationsStore(
//     (s) => s.hydrateNotifications,
//   );
//   const hydrateMenu = useMenuStore((s) => s.hydrateMenu);

//   useEffect(() => {
//     hydrateCart();
//     hydrateFavorites();
//     hydrateNotifications();
//     hydrateMenu();
//   }, []);

//   return (
//     <SafeAreaView style={styles.container} edges={["top"]}>
//       <StatusBar barStyle="default" />

//       <ScrollView
//         keyboardShouldPersistTaps="handled"
//         contentContainerStyle={styles.scrollContent}
//         showsVerticalScrollIndicator={false}
//       >
//         <HomeHeader />

//         <SearchBar
//           value={search}
//           onChangeText={setSearch}
//           isFocused={isSearchFocused}
//           onFocus={() => setIsSearchFocused(true)}
//           onBlur={() => {}}
//         />

//         <Banner />
//         <TabNavigation onSelect={setCategory} />
//         <MenuList category={category} search={search} />
//       </ScrollView>

//       <SearchOverlay
//         visible={isSearchFocused}
//         query={search}
//         onClose={() => setIsSearchFocused(false)}
//       />
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: "white",
//     paddingHorizontal: 10,
//     flex: 1,
//   },
//   scrollContent: {
//     gap: 20,
//   },
// });

import Banner from "@/components/home/Banner";
import HomeHeader from "@/components/home/HomeHeader";
import MenuList from "@/components/home/MenuList";
import SearchBar from "@/components/home/SearchBar";
import SearchOverlay from "@/components/home/SearchOverlay";
import TabNavigation from "@/components/home/TabNavigation";
import { useCartStore } from "@/store/cartStore";
import { useFavoritesStore } from "@/store/favoritesStore";
import { useMenuStore } from "@/store/menuStore";
import { useNotificationsStore } from "@/store/notificationsStore";
import { useTheme } from "@/theme/ThemeProvider";
import { useEffect, useState } from "react";
import { ScrollView, StatusBar, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const hydrateCart = useCartStore((s) => s.hydrateCart);
  const hydrateFavorites = useFavoritesStore((s) => s.hydrateFavorites);
  const hydrateNotifications = useNotificationsStore(
    (s) => s.hydrateNotifications,
  );
  const hydrateMenu = useMenuStore((s) => s.hydrateMenu);
  const { colors, resolvedMode } = useTheme();

  useEffect(() => {
    hydrateCart();
    hydrateFavorites();
    hydrateNotifications();
    hydrateMenu();
  }, []);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
      edges={["top"]}
    >
      <StatusBar
        barStyle={resolvedMode === "dark" ? "light-content" : "dark-content"}
      />

      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <HomeHeader />

        <SearchBar
          value={search}
          onChangeText={setSearch}
          isFocused={isSearchFocused}
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => {}}
        />

        <Banner />
        <TabNavigation onSelect={setCategory} />
        <MenuList category={category} search={search} />
      </ScrollView>

      <SearchOverlay
        visible={isSearchFocused}
        query={search}
        onClose={() => setIsSearchFocused(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    flex: 1,
  },
  scrollContent: {
    gap: 20,
  },
});
