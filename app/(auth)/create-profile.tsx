import AppText from "@/components/AppText";
import AvatarPicker from "@/components/AvatarPicker";
import Feather from "@expo/vector-icons/Feather";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CreateProfile() {
    return (
        <SafeAreaView>
            <AppText>Create your new profile</AppText>


            <AvatarPicker />
        </SafeAreaView>
    )
}