// components/PhoneNumberInput.tsx
import { Dispatch, SetStateAction, useState } from "react";
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const COUNTRIES = [
  { code: "+234", flag: "🇳🇬", name: "Nigeria" },
  { code: "+27", flag: "🇿🇦", name: "South Africa" },
  { code: "+233", flag: "🇬🇭", name: "Ghana" },
  { code: "+221", flag: "🇸🇳", name: "Senegal" },
  { code: "+237", flag: "🇨🇲", name: "Cameroun" },
  { code: "+254", flag: "🇰🇪", name: "Kenya" },
  { code: "+255", flag: "🇹🇿", name: "Tanzania" },
  { code: "+212", flag: "🇲🇦", name: "Morocco" },
  { code: "+1", flag: "🇺🇸", name: "United States" },
  { code: "+44", flag: "🇬🇧", name: "United Kingdom" },
  { code: "+86", flag: "🇨🇳", name: "China" },
  { code: "+81", flag: "🇯🇵", name: "Japan" },
  { code: "+61", flag: "🇦🇺", name: "Australia" },
  { code: "+1", flag: "🇨🇦", name: "Canada" },
  { code: "+32", flag: "🇧🇪", name: "Belgium" },
];

type Props = {
  phoneNumber: string;
  onChangePhoneNumber: (value: string) => void;
  countryCode: string;
  onChangeCountryCode: (value: string) => void;
  isNumberFocused: boolean;
  setIsNumberFocused: Dispatch<SetStateAction<boolean>>;
};

export default function PhoneNumberInput({
  phoneNumber,
  onChangePhoneNumber,
  isNumberFocused,
  setIsNumberFocused,
  onChangeCountryCode,
}: Props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedName, setSelectedName] = useState("Nigeria");

  const selected =
    COUNTRIES.find((c) => c.name === selectedName) ?? COUNTRIES[0];

  return (
    <View
      style={[styles.container, isNumberFocused && styles.containerFocused]}
    >
      <TouchableOpacity
        style={styles.codeBox}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.codeText}>
          {selected.flag} {selected.code}
        </Text>
      </TouchableOpacity>

      <View style={styles.divider} />

      <TextInput
        placeholder="Phone number"
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={onChangePhoneNumber}
        placeholderTextColor="#979696"
        style={styles.input}
        onFocus={() => setIsNumberFocused(true)}
        onBlur={() => setIsNumberFocused(false)}
      />

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Country</Text>
            <FlatList
              data={COUNTRIES}
              keyExtractor={(item) => item.name}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.countryRow}
                  onPress={() => {
                    setSelectedName(item.name);
                    onChangeCountryCode(item.code);
                    setModalVisible(false);
                  }}
                >
                  <Text style={styles.countryText}>
                    {item.flag} {item.name} ({item.code})
                  </Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    height: 52,
    paddingHorizontal: 12,
  },
  containerFocused: {
    borderColor: "#5ead1d",
  },
  codeBox: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 8,
  },
  codeText: {
    fontSize: 16,
  },
  divider: {
    width: 1,
    height: "60%",
    backgroundColor: "#E0E0E0",
    marginHorizontal: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: "Poppins-Regular",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
    maxHeight: "60%",
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  countryRow: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  countryText: {
    fontSize: 15,
  },
  closeButton: {
    paddingVertical: 14,
    alignItems: "center",
  },
  closeButtonText: {
    fontSize: 15,
    color: "#888",
  },
});
