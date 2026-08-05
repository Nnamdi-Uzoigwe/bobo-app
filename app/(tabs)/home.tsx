import Banner from "@/components/home/Banner";
import HomeHeader from "@/components/home/HomeHeader";
import MenuList from "@/components/home/MenuList";
import SearchBar from "@/components/home/SearchBar";
import SearchOverlay from "@/components/home/SearchOverlay";
import TabNavigation from "@/components/home/TabNavigation";
import { useState } from "react";
import { ScrollView, StatusBar, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    //     <SafeAreaView style={styles.container} edges={["top"]}>
    //       <StatusBar barStyle="default" />
    //       <ScrollView
    //         keyboardShouldPersistTaps="handled"
    //         contentContainerStyle={styles.scrollContent}
    //         showsVerticalScrollIndicator={false}
    //       >
    //         <HomeHeader />
    //         {/* <SearchBar /> */}
    //         <SearchBar
    //   value={search}
    //   onChangeText={setSearch}
    //   isFocused={isSearchFocused}
    //   onFocus={() => setIsSearchFocused(true)}
    //   onBlur={() => setIsSearchFocused(false)}
    // />
    //         <Banner />
    //         <TabNavigation onSelect={setCategory} />
    //         <MenuList category={category} />
    //       </ScrollView>
    //     </SafeAreaView>

    <SafeAreaView style={styles.container} edges={["top"]}>
      <StatusBar barStyle="default" />

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
        <MenuList category={category} />
      </ScrollView>

      <SearchOverlay
        visible={isSearchFocused}
        onClose={() => setIsSearchFocused(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingHorizontal: 10,
    flex: 1,
  },
  scrollContent: {
    gap: 20,
  },
});
