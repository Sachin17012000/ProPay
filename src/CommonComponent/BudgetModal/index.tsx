import React from "react";
import {
  Modal,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Text from "../../CommonComponent/Text";
import colors from "../Theme/Color";

interface BudgetModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: () => void;
  daily: string;
  weekly: string;
  monthly: string;
  setDaily: React.Dispatch<React.SetStateAction<string>>;
  setWeekly: React.Dispatch<React.SetStateAction<string>>;
  setMonthly: React.Dispatch<React.SetStateAction<string>>;
}

export default function BudgetModal({
  visible,
  onClose,
  onSave,
  daily,
  weekly,
  monthly,
  setDaily,
  setWeekly,
  setMonthly,
}: BudgetModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.modalContent}>
              <Text textType="headingBold" style={styles.marginBottom15}>
                Set Budgets
              </Text>
              <View style={styles.marginBottom10}>
                <Text textType="baseRegularBold" style={styles.marginBottom5}>
                  Daily Budget
                </Text>
                <TextInput
                  placeholder="Enter amount"
                  keyboardType="numeric"
                  value={daily}
                  onChangeText={(text) => {
                    const sanitized = text.replace(/[^0-9]/g, "");
                    if (sanitized === "" || sanitized === "0") {
                      setDaily("");
                    } else {
                      setDaily(sanitized);
                    }
                  }}
                  style={styles.input}
                />
              </View>
              <View style={styles.marginBottom10}>
                <Text textType="baseRegularBold" style={styles.marginBottom5}>
                  Weekly Budget
                </Text>
                <TextInput
                  placeholder="Enter amount"
                  keyboardType="numeric"
                  value={weekly}
                  onChangeText={(text) => {
                    // Remove non-digit characters
                    const sanitized = text.replace(/[^0-9]/g, "");
                    // Ensure it’s not "0"
                    if (sanitized === "" || sanitized === "0") {
                      setWeekly("");
                    } else {
                      setWeekly(sanitized);
                    }
                  }}
                  style={styles.input}
                />
              </View>
              <View style={styles.marginBottom10}>
                <Text textType="baseRegularBold" style={styles.marginBottom5}>
                  Monthly Budget
                </Text>
                <TextInput
                  placeholder="Enter amount"
                  keyboardType="numeric"
                  value={monthly}
                  onChangeText={(text) => {
                    // Remove non-digit characters
                    const sanitized = text.replace(/[^0-9]/g, "");
                    // Ensure it’s not "0"
                    if (sanitized === "" || sanitized === "0") {
                      setMonthly("");
                    } else {
                      setMonthly(sanitized);
                    }
                  }}
                  style={styles.input}
                />
              </View>
              <View style={styles.rowBetween}>
                <TouchableOpacity style={styles.button} onPress={onSave}>
                  <Text textType="baseRegularBold" style={styles.buttonText}>
                    Save
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, { backgroundColor: colors.grey }]}
                  onPress={onClose}
                >
                  <Text textType="baseRegularBold" style={styles.buttonText}>
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: colors.shadowBlack,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "85%",
    backgroundColor: colors.ivory,
    borderRadius: 12,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.ash,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  rowBetween: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 5,
    backgroundColor: colors.green,
  },
  buttonText: {
    color: colors.ivory,
  },
  marginBottom5: {
    marginBottom: 5,
  },
  marginBottom10: {
    marginBottom: 10,
  },
  marginBottom15: {
    marginBottom: 15,
  },
});
