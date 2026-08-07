import AppText from "@/components/AppText";
import Button from "@/components/Button";
import ScreenHeader from "@/components/ui/ScreenHeader";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import {
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    TextInput,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MyAccountScreen() {
  const [name, setName] = useState("Daniel Jones");
  const [password, setPassword] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader title="My Account" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        <View style={styles.avatarWrap}>
          <Image
            source={require("@/assets/images/avatar.png")}
            style={styles.avatar}
          />
          <Pressable style={styles.editBadge}>
            <Feather name="camera" size={14} color="#FFFFFF" />
          </Pressable>
        </View>

        <View style={styles.field}>
          <AppText size={13} weight="medium" color="#61685c">
            Username
          </AppText>
          <TextInput value={name} onChangeText={setName} style={styles.input} />
        </View>

        <View style={styles.field}>
          <AppText size={13} weight="medium" color="#61685c">
            New password
          </AppText>
          <TextInput
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            placeholder="••••••••"
            placeholderTextColor="#9CA3AF"
            secureTextEntry
          />
        </View>

        <Button
          label="Save changes"
          onPress={() => {}}
          style={styles.saveButton}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF", paddingHorizontal: 10 },
  scroll: { paddingTop: 4, paddingBottom: 40 },
  avatarWrap: { alignSelf: "center", marginVertical: 20 },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#F4F7F2",
  },
  editBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#5EAD1D",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  field: { marginBottom: 18, gap: 8 },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#E2E6DF",
    borderRadius: 12,
    paddingHorizontal: 14,
    fontSize: 15,
    fontFamily: "Poppins-Regular",
    color: "#1F2937",
  },
  saveButton: { alignSelf: "stretch", marginTop: 10 },
});
