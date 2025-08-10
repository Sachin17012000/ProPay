import React, { useState } from "react";
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
              <Text textType="headingBold" style={{ marginBottom: 15 }}>
                Set Budgets
              </Text>

              <View style={{ marginBottom: 10 }}>
                <Text textType="baseRegularBold" style={{ marginBottom: 5 }}>
                  Daily Budget
                </Text>
                <TextInput
                  placeholder="Enter amount"
                  keyboardType="numeric"
                  value={daily}
                  onChangeText={setDaily}
                  style={styles.input}
                />
              </View>
              <View style={{ marginBottom: 10 }}>
                <Text textType="baseRegularBold" style={{ marginBottom: 5 }}>
                  Weekly Budget
                </Text>
                <TextInput
                  placeholder="Enter amount"
                  keyboardType="numeric"
                  value={weekly}
                  onChangeText={setWeekly}
                  style={styles.input}
                />
              </View>

              <View style={{ marginBottom: 10 }}>
                <Text textType="baseRegularBold" style={{ marginBottom: 5 }}>
                  Monthly Budget
                </Text>
                <TextInput
                  placeholder="Enter amount"
                  keyboardType="numeric"
                  value={monthly}
                  onChangeText={setMonthly}
                  style={styles.input}
                />
              </View>

              <View style={styles.rowBetween}>
                <TouchableOpacity
                  style={[styles.button, { backgroundColor: "#4CAF50" }]}
                  onPress={onSave}
                >
                  <Text textType="baseRegularBold" style={styles.buttonText}>
                    Save
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, { backgroundColor: "gray" }]}
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
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 5,
  },
  buttonText: {
    color: "#fff",
  },
});
