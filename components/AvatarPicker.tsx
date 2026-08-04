import { Ionicons } from "@expo/vector-icons";
import { File } from "expo-file-system";
import { Image } from "expo-image";
import * as ImageManipulator from "expo-image-manipulator";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Alert, Pressable, StyleSheet, View } from "react-native";

const MAX_FILE_SIZE_BYTES = 1 * 1024 * 1024; // 1MB

type AvatarPickerProps = {
  size?: number;
  onImageSelected?: (uri: string) => void;
};

export default function AvatarPicker({
  size = 100,
  onImageSelected,
}: AvatarPickerProps) {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const requestPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission needed",
        "We need access to your photos to set a profile picture. You can enable this in your device settings.",
        [{ text: "OK" }]
      );
      return false;
    }

    return true;
  };

  const getFileSize = async (uri: string) => {
    const file = new File(uri);
    return file.exists ? file.size ?? 0 : 0;
  };

  const compressUntilUnderLimit = async (uri: string) => {
    let quality = 0.8;
    let result = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { width: 800 } }],
      { compress: quality, format: ImageManipulator.SaveFormat.JPEG }
    );

    let fileSize = await getFileSize(result.uri);

    // Keep compressing down in steps until under the limit,
    // or bail out after a few tries to avoid an infinite loop.
    let attempts = 0;
    while (fileSize > MAX_FILE_SIZE_BYTES && attempts < 5) {
      quality -= 0.15;
      if (quality < 0.2) quality = 0.2;

      result = await ImageManipulator.manipulateAsync(
        uri,
        [{ resize: { width: 800 } }],
        { compress: quality, format: ImageManipulator.SaveFormat.JPEG }
      );

      fileSize = await getFileSize(result.uri);
      attempts++;
    }

    return { uri: result.uri, size: fileSize };
  };

  const pickImage = async () => {
    const hasPermission = await requestPermission();
    if (!hasPermission) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (result.canceled) return;

    const asset = result.assets[0];
    setLoading(true);

    try {
      const originalSize = await getFileSize(asset.uri);

      let finalUri = asset.uri;

      if (originalSize > MAX_FILE_SIZE_BYTES) {
        const compressed = await compressUntilUnderLimit(asset.uri);

        if (compressed.size > MAX_FILE_SIZE_BYTES) {
          Alert.alert(
            "Image too large",
            "This image is too large even after compression. Please choose a smaller image."
          );
          setLoading(false);
          return;
        }

        finalUri = compressed.uri;
      }

      setImageUri(finalUri);
      onImageSelected?.(finalUri);
    } catch (error) {
      Alert.alert("Something went wrong", "Could not process that image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.wrapper, { width: size, height: size }]}>
      <View
        style={[
          styles.circle,
          { width: size, height: size, borderRadius: size / 2 },
        ]}
      >
        {imageUri ? (
          <Image
            source={{ uri: imageUri }}
            style={{ width: size, height: size, borderRadius: size / 2 }}
            contentFit="cover"
          />
        ) : (
          <Ionicons name="person" size={size * 0.5} color="#FFFFFF" />
        )}
      </View>

      <Pressable
        style={styles.badge}
        onPress={pickImage}
        disabled={loading}
        hitSlop={8}
      >
        <Ionicons
          name={loading ? "hourglass-outline" : "camera"}
          size={16}
          color="#6B7280"
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "relative",
  },
  circle: {
    backgroundColor: "#A6A9AD",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  badge: {
    position: "absolute",
    bottom: -2,
    right: -2,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
});