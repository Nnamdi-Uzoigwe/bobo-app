// import { useState } from "react";
// import { Pressable, ScrollView, StyleSheet } from "react-native";
// import AppText from "../AppText";

// const CATEGORIES = [
//   "All",
//   "burger",
//   "pizza",
//   "meat wraps",
//   "rice",
//   "soup",
//   "drinks",
//   "dessert",
//   "snacks",
// ];

// type TabNavigationProps = {
//   onSelect?: (category: string) => void;
// };

// export default function TabNavigation({ onSelect }: TabNavigationProps) {
//   const [activeTab, setActiveTab] = useState("All");

//   const handlePress = (category: string) => {
//     setActiveTab(category);
//     onSelect?.(category);
//   };

//   return (
//     <ScrollView
//       horizontal
//       showsHorizontalScrollIndicator={false}
//       contentContainerStyle={styles.container}
//     >
//       {CATEGORIES.map((category) => {
//         const isActive = category === activeTab;
//         return (
//           <Pressable
//             key={category}
//             onPress={() => handlePress(category)}
//             style={[
//               styles.tab,
//               isActive ? styles.activeTab : styles.inactiveTab,
//             ]}
//           >
//             <AppText
//               size={14}
//               weight={isActive ? "semibold" : "regular"}
//               color={isActive ? "#FFFFFF" : "#6B7280"}
//               style={styles.label}
//             >
//               {category}
//             </AppText>
//           </Pressable>
//         );
//       })}
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     gap: 10,
//     paddingVertical: 6,
//   },
//   tab: {
//     height: 40,
//     paddingHorizontal: 18,
//     borderRadius: 20,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   activeTab: {
//     backgroundColor: "#5EAD1D",
//   },
//   inactiveTab: {
//     backgroundColor: "#ECF1E8",
//   },
//   label: {
//     textTransform: "capitalize",
//   },
// });

import { useTheme } from "@/theme/ThemeProvider";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet } from "react-native";
import AppText from "../AppText";

const CATEGORIES = [
  "All",
  "burger",
  "pizza",
  "meat wraps",
  "rice",
  "soup",
  "drinks",
  "dessert",
  "snacks",
];

type TabNavigationProps = {
  onSelect?: (category: string) => void;
};

export default function TabNavigation({ onSelect }: TabNavigationProps) {
  const [activeTab, setActiveTab] = useState("All");
  const { colors } = useTheme();

  const handlePress = (category: string) => {
    setActiveTab(category);
    onSelect?.(category);
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {CATEGORIES.map((category) => {
        const isActive = category === activeTab;
        return (
          <Pressable
            key={category}
            onPress={() => handlePress(category)}
            style={[
              styles.tab,
              {
                backgroundColor: isActive
                  ? colors.primary
                  : colors.primaryMuted,
              },
            ]}
          >
            <AppText
              size={14}
              weight={isActive ? "semibold" : "regular"}
              color={isActive ? "#FFFFFF" : colors.textMuted}
              style={styles.label}
            >
              {category}
            </AppText>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
    paddingVertical: 6,
  },
  tab: {
    height: 40,
    paddingHorizontal: 18,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    textTransform: "capitalize",
  },
});
