// components/DateOfBirthPicker.tsx
import { Dispatch, SetStateAction, useMemo, useRef, useState } from "react";
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const ITEM_HEIGHT = 44;

function getDaysInMonth(month: number, year: number) {
  return new Date(year, month + 1, 0).getDate();
}

type Props = {
  value: Date | null;
  onChange: (date: Date) => void;
  minAge?: number;
  maxAge?: number;
  isDateFocused: boolean;
  setIsDateFocused: Dispatch<SetStateAction<boolean>>;
};

export default function DateOfBirthPicker({
  value,
  onChange,
  minAge = 13,
  maxAge = 100,
  isDateFocused,
  setIsDateFocused,
}: Props) {
  const [modalVisible, setModalVisible] = useState(false);

  const currentYear = new Date().getFullYear();
  const years = useMemo(() => {
    const list = [];
    for (let y = currentYear - maxAge; y <= currentYear - minAge; y++) {
      list.push(y);
    }
    return list;
  }, [currentYear, minAge, maxAge]);

  const initial = value ?? new Date(currentYear - minAge, 0, 1);

  const [tempDay, setTempDay] = useState(initial.getDate());
  const [tempMonth, setTempMonth] = useState(initial.getMonth());
  const [tempYear, setTempYear] = useState(initial.getFullYear());

  const days = useMemo(
    () =>
      Array.from(
        { length: getDaysInMonth(tempMonth, tempYear) },
        (_, i) => i + 1,
      ),
    [tempMonth, tempYear],
  );

  const dayListRef = useRef<FlatList>(null);
  const monthListRef = useRef<FlatList>(null);
  const yearListRef = useRef<FlatList>(null);

  const openPicker = () => {
    setIsDateFocused(true);
    setModalVisible(true);
  };

  const closePicker = () => {
    setIsDateFocused(false);
    setModalVisible(false);
  };

  const handleConfirm = () => {
    const validDay = Math.min(tempDay, getDaysInMonth(tempMonth, tempYear));
    onChange(new Date(tempYear, tempMonth, validDay));
    closePicker();
  };

  const displayText = value
    ? `${value.getDate().toString().padStart(2, "0")} ${
        MONTHS[value.getMonth()]
      } ${value.getFullYear()}`
    : "Select date of birth";

  return (
    <View>
      <TouchableOpacity
        style={[styles.inputBox, isDateFocused && styles.inputBoxFocused]}
        onPress={openPicker}
      >
        <Text style={[styles.inputText, !value && styles.placeholder]}>
          {displayText}
        </Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.overlay}>
          <View style={styles.sheet}>
            <View style={styles.header}>
              <TouchableOpacity onPress={closePicker}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <Text style={styles.title}>Date of Birth</Text>
              <TouchableOpacity onPress={handleConfirm}>
                <Text style={styles.doneText}>Done</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.pickerRow}>
              {/* Day */}
              <View style={styles.column}>
                <View pointerEvents="none" style={styles.highlight} />
                <FlatList
                  ref={dayListRef}
                  data={days}
                  keyExtractor={(item) => `d-${item}`}
                  showsVerticalScrollIndicator={false}
                  snapToInterval={ITEM_HEIGHT}
                  decelerationRate="fast"
                  getItemLayout={(_, i) => ({
                    length: ITEM_HEIGHT,
                    offset: ITEM_HEIGHT * i,
                    index: i,
                  })}
                  contentContainerStyle={styles.listPadding}
                  onMomentumScrollEnd={(e) => {
                    const idx = Math.round(
                      e.nativeEvent.contentOffset.y / ITEM_HEIGHT,
                    );
                    setTempDay(
                      days[Math.max(0, Math.min(idx, days.length - 1))],
                    );
                  }}
                  renderItem={({ item }) => (
                    <View style={styles.item}>
                      <Text
                        style={[
                          styles.itemText,
                          item === tempDay && styles.itemTextActive,
                        ]}
                      >
                        {item}
                      </Text>
                    </View>
                  )}
                />
              </View>

              {/* Month */}
              <View style={styles.column}>
                <View pointerEvents="none" style={styles.highlight} />
                <FlatList
                  ref={monthListRef}
                  data={MONTHS}
                  keyExtractor={(item) => item}
                  showsVerticalScrollIndicator={false}
                  snapToInterval={ITEM_HEIGHT}
                  decelerationRate="fast"
                  getItemLayout={(_, i) => ({
                    length: ITEM_HEIGHT,
                    offset: ITEM_HEIGHT * i,
                    index: i,
                  })}
                  contentContainerStyle={styles.listPadding}
                  onMomentumScrollEnd={(e) => {
                    const idx = Math.round(
                      e.nativeEvent.contentOffset.y / ITEM_HEIGHT,
                    );
                    setTempMonth(Math.max(0, Math.min(idx, MONTHS.length - 1)));
                  }}
                  renderItem={({ item, index }) => (
                    <View style={styles.item}>
                      <Text
                        style={[
                          styles.itemText,
                          index === tempMonth && styles.itemTextActive,
                        ]}
                      >
                        {item}
                      </Text>
                    </View>
                  )}
                />
              </View>

              {/* Year */}
              <View style={styles.column}>
                <View pointerEvents="none" style={styles.highlight} />
                <FlatList
                  ref={yearListRef}
                  data={years}
                  keyExtractor={(item) => `y-${item}`}
                  showsVerticalScrollIndicator={false}
                  snapToInterval={ITEM_HEIGHT}
                  decelerationRate="fast"
                  initialScrollIndex={Math.max(0, years.indexOf(tempYear))}
                  getItemLayout={(_, i) => ({
                    length: ITEM_HEIGHT,
                    offset: ITEM_HEIGHT * i,
                    index: i,
                  })}
                  contentContainerStyle={styles.listPadding}
                  onMomentumScrollEnd={(e) => {
                    const idx = Math.round(
                      e.nativeEvent.contentOffset.y / ITEM_HEIGHT,
                    );
                    setTempYear(
                      years[Math.max(0, Math.min(idx, years.length - 1))],
                    );
                  }}
                  renderItem={({ item }) => (
                    <View style={styles.item}>
                      <Text
                        style={[
                          styles.itemText,
                          item === tempYear && styles.itemTextActive,
                        ]}
                      >
                        {item}
                      </Text>
                    </View>
                  )}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  inputBox: {
    borderWidth: 1,
    borderColor: "#f5f6f3",
    backgroundColor: "#F5F6F3",
    borderRadius: 12,
    height: 52,
    paddingHorizontal: 14,
    justifyContent: "center",
  },
  inputBoxFocused: {
    borderColor: "#5ead1d",
  },
  inputText: {
    fontSize: 16,
    color: "#111",
  },
  placeholder: {
    color: "#999",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  sheet: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingBottom: 24,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
  },
  cancelText: {
    fontSize: 15,
    color: "#888",
  },
  doneText: {
    fontSize: 15,
    color: "#007AFF",
    fontWeight: "600",
  },
  pickerRow: {
    flexDirection: "row",
    height: ITEM_HEIGHT * 5,
    paddingTop: 8,
  },
  column: {
    flex: 1,
  },
  highlight: {
    position: "absolute",
    top: ITEM_HEIGHT * 2,
    left: 0,
    right: 0,
    height: ITEM_HEIGHT,
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    zIndex: -1,
  },
  listPadding: {
    paddingVertical: ITEM_HEIGHT * 2,
  },
  item: {
    height: ITEM_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
  },
  itemText: {
    fontSize: 16,
    color: "#999",
  },
  itemTextActive: {
    fontSize: 17,
    color: "#111",
    fontWeight: "600",
  },
});
