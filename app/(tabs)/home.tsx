import Banner from "@/components/home/Banner";
import HomeHeader from "@/components/home/HomeHeader";
import MenuList from "@/components/home/MenuList";
import SearchBar from "@/components/home/SearchBar";
import TabNavigation from "@/components/home/TabNavigation";
import { useState } from "react";
import { ScrollView, StatusBar, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const [category, setCategory] = useState("All");
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <StatusBar barStyle="default" />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <HomeHeader />
        <SearchBar />
        <Banner />
        <TabNavigation onSelect={setCategory} />
        <MenuList category={category} />
      </ScrollView>
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
