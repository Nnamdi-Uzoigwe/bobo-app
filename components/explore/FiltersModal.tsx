import AppText from "@/components/AppText";
import Button from "@/components/Button";
import { categories } from "@/constants/categories";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import {
    Modal,
    StyleSheet,
    Switch,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const sortOptions = ["Rating", "Price", "Delivery time", "Popularity"];

type Props = {
  visible: boolean;
  onClose: () => void;
  resultCount: number;
};

export default function FiltersModal({ visible, onClose, resultCount }: Props) {
  const [selectedSort, setSelectedSort] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [othersEnabled, setOthersEnabled] = useState(false);

  const toggleSort = (option: string) => {
    setSelectedSort((prev) =>
      prev.includes(option)
        ? prev.filter((o) => o !== option)
        : [...prev, option],
    );
  };

  const handleRemoveAll = () => {
    setSelectedSort([]);
    setSelectedType(null);
    setOthersEnabled(false);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <SafeAreaView style={styles.sheet}>
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose}>
              <AntDesign name="close" size={22} color="#363a33" />
            </TouchableOpacity>
            <AppText size={18} weight="bold" color="#363a33">
              Filters
            </AppText>
            <AppText size={14} color="#61685c">
              {resultCount} results
            </AppText>
          </View>

          <AppText
            size={13}
            weight="medium"
            color="#61685c"
            style={styles.sectionLabel}
          >
            Sort by
          </AppText>
          <View style={styles.chipRow}>
            {sortOptions.map((option) => (
              <TouchableOpacity
                key={option}
                onPress={() => toggleSort(option)}
                style={[
                  styles.chip,
                  selectedSort.includes(option) && styles.chipActive,
                ]}
              >
                <AppText
                  size={13}
                  weight="medium"
                  color={selectedSort.includes(option) ? "#363a33" : "#61685c"}
                >
                  {option}
                </AppText>
              </TouchableOpacity>
            ))}
          </View>

          <AppText
            size={13}
            weight="medium"
            color="#61685c"
            style={styles.sectionLabel}
          >
            Food type
          </AppText>
          <View style={styles.chipRow}>
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat.id}
                onPress={() => setSelectedType(cat.id)}
                style={[
                  styles.chip,
                  selectedType === cat.id && styles.chipActive,
                ]}
              >
                <AppText
                  size={13}
                  weight="medium"
                  color={selectedType === cat.id ? "#363a33" : "#61685c"}
                >
                  {cat.label}
                </AppText>
              </TouchableOpacity>
            ))}
          </View>

          <AppText
            size={13}
            weight="medium"
            color="#61685c"
            style={styles.sectionLabel}
          >
            Others
          </AppText>
          <View style={styles.othersRow}>
            <AppText size={14} color="#363a33">
              Bobo Food +
            </AppText>
            <Switch
              value={othersEnabled}
              onValueChange={setOthersEnabled}
              trackColor={{ true: "#5EAD1D", false: "#E2E6DF" }}
            />
          </View>

          <View style={styles.footer}>
            <TouchableOpacity
              onPress={handleRemoveAll}
              style={styles.removeAllButton}
            >
              <AppText weight="semibold" color="#363a33">
                Remove all
              </AppText>
            </TouchableOpacity>

            <Button
              label="Apply Filters"
              onPress={onClose}
              style={styles.applyButton}
            />
          </View>
        </SafeAreaView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "flex-end",
  },
  sheet: {
    backgroundColor: "white",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 16,
    paddingTop: 16,
    maxHeight: "85%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  sectionLabel: { marginBottom: 10, marginTop: 8 },
  chipRow: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 8 },
  chip: {
    borderWidth: 1,
    borderColor: "#E2E6DF",
    borderRadius: 30,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  chipActive: { backgroundColor: "#ECF1E8", borderColor: "#ECF1E8" },
  othersRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F4F7F2",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginTop: 4,
  },
  footer: { flexDirection: "row", gap: 12, marginTop: 24, marginBottom: 16 },
  removeAllButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#E2E6DF",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  applyButton: { flex: 1 },
});
