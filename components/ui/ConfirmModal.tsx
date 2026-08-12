// import AppText from "@/components/AppText";
// import { Modal, Pressable, StyleSheet, View } from "react-native";

// type ConfirmModalProps = {
//   visible: boolean;
//   title: string;
//   message: string;
//   confirmLabel: string;
//   confirmColor?: string;
//   onConfirm: () => void;
//   onCancel: () => void;
// };

// export default function ConfirmModal({
//   visible,
//   title,
//   message,
//   confirmLabel,
//   confirmColor = "#E4572E",
//   onConfirm,
//   onCancel,
// }: ConfirmModalProps) {
//   return (
//     <Modal
//       visible={visible}
//       transparent
//       animationType="fade"
//       onRequestClose={onCancel}
//     >
//       <View style={styles.overlay}>
//         <View style={styles.card}>
//           <AppText size={20} weight="bold" color="#1F2937">
//             {title}
//           </AppText>
//           <AppText size={14} color="#6B7280" style={styles.message}>
//             {message}
//           </AppText>

//           <View style={styles.buttonRow}>
//             <Pressable
//               style={[styles.button, styles.cancelButton]}
//               onPress={onCancel}
//             >
//               <AppText size={15} weight="semibold" color="#1F2937">
//                 Cancel
//               </AppText>
//             </Pressable>

//             <Pressable
//               style={[styles.button, { backgroundColor: confirmColor }]}
//               onPress={onConfirm}
//             >
//               <AppText size={15} weight="semibold" color="#FFFFFF">
//                 {confirmLabel}
//               </AppText>
//             </Pressable>
//           </View>
//         </View>
//       </View>
//     </Modal>
//   );
// }

// const styles = StyleSheet.create({
//   overlay: {
//     flex: 1,
//     backgroundColor: "rgba(0,0,0,0.4)",
//     justifyContent: "center",
//     paddingHorizontal: 20,
//   },
//   card: { backgroundColor: "#FFFFFF", borderRadius: 20, padding: 24 },
//   message: { marginTop: 10, lineHeight: 20 },
//   buttonRow: { flexDirection: "row", gap: 12, marginTop: 24 },
//   button: {
//     flex: 1,
//     height: 50,
//     borderRadius: 12,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   cancelButton: {
//     borderWidth: 1,
//     borderColor: "#E2E6DF",
//     backgroundColor: "#FFFFFF",
//   },
// });

import AppText from "@/components/AppText";
import { useTheme } from "@/theme/ThemeProvider";
import { Modal, Pressable, StyleSheet, View } from "react-native";

type ConfirmModalProps = {
  visible: boolean;
  title: string;
  message: string;
  confirmLabel: string;
  confirmColor?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmModal({
  visible,
  title,
  message,
  confirmLabel,
  confirmColor,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  const { colors } = useTheme();
  const resolvedConfirmColor = confirmColor ?? colors.danger;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View style={styles.overlay}>
        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <AppText size={20} weight="bold" color={colors.text}>
            {title}
          </AppText>
          <AppText size={14} color={colors.textMuted} style={styles.message}>
            {message}
          </AppText>

          <View style={styles.buttonRow}>
            <Pressable
              style={[
                styles.button,
                styles.cancelButton,
                { borderColor: colors.border, backgroundColor: colors.card },
              ]}
              onPress={onCancel}
            >
              <AppText size={15} weight="semibold" color={colors.text}>
                Cancel
              </AppText>
            </Pressable>

            <Pressable
              style={[styles.button, { backgroundColor: resolvedConfirmColor }]}
              onPress={onConfirm}
            >
              <AppText size={15} weight="semibold" color={colors.white}>
                {confirmLabel}
              </AppText>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  card: { borderRadius: 20, padding: 24 },
  message: { marginTop: 10, lineHeight: 20 },
  buttonRow: { flexDirection: "row", gap: 12, marginTop: 24 },
  button: {
    flex: 1,
    height: 50,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButton: {
    borderWidth: 1,
  },
});
