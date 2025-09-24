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
import { budgetArray } from "../../utils/staticData";

interface BudgetModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: () => void;
  budgets: {
    Daily: string;
    Weekly: string;
    Monthly: string;
  };
  setBudgets: React.Dispatch<
    React.SetStateAction<{ Daily: string; Weekly: string; Monthly: string }>
  >;
}

export default function BudgetModal({
  visible,
  onClose,
  onSave,
  budgets,
  setBudgets,
}: BudgetModalProps) {
  const handleInputChange = (
    period: "Daily" | "Weekly" | "Monthly",
    text: string
  ) => {
    const sanitized = text.replace(/[^0-9]/g, "");
    setBudgets((prev) => ({
      ...prev,
      [period]: sanitized === "" || sanitized === "0" ? "" : sanitized,
    }));
  };
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      accessibilityViewIsModal={true}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            accessible={false}
          >
            <View style={styles.modalContent}>
              <Text
                textType="headingBold"
                style={styles.marginBottom15}
                accessibilityRole="header"
              >
                Set Budgets
              </Text>
              {budgetArray.map((period) => (
                <View key={period} style={styles.marginBottom10}>
                  <Text
                    textType="baseRegularBold"
                    style={styles.marginBottom5}
                    accessibilityRole="text"
                    accessibilityElementsHidden
                    accessible={false}
                    importantForAccessibility="no"
                  >
                    {period} Budget
                  </Text>
                  <TextInput
                    placeholder="Enter amount"
                    keyboardType="numeric"
                    value={budgets[period]}
                    onChangeText={(text) => handleInputChange(period, text)}
                    style={styles.input}
                    accessibilityLabel={`${period} budget amount`}
                    accessibilityHint={`Enter the ${period.toLowerCase()} budget in numbers`}
                  />
                </View>
              ))}
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
