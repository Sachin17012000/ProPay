import React, { useState } from "react";
import {
  Modal,
  View,
  TextInput,
  TouchableOpacity,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import uuid from "react-native-uuid";
import styles from "./style";
import { Transaction } from "../../types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { categories } from "../../utils/staticData";
import { useAppSelector } from "../../hooks/hook";
import colors from "../Theme/Color";
import Text from "../Text";

type Props = {
  visible: boolean;
  onClose: () => void;
  onSave: (txn: Transaction) => void;
};

export const AddExpenseModal: React.FC<Props> = ({
  visible,
  onClose,
  onSave,
}) => {
  const { user } = useAppSelector((state) => state.user);
  const [form, setForm] = useState({
    type: "send" as "send" | "add",
    amount: "",
    to: "",
    from: "",
    note: "",
    category: "Food",
    date: new Date(),
  });
  const [showDatePicker, setShowDatePicker] = useState(false);

  const updateForm = (key: keyof typeof form, value: any) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const resetForm = () =>
    setForm({
      type: "send",
      amount: "",
      to: "",
      from: "",
      note: "",
      category: "Food",
      date: new Date(),
    });

  const handleSave = () => {
    if (
      !form.amount ||
      isNaN(Number(form.amount)) ||
      Number(form.amount) <= 0
    ) {
      return alert("Please enter a valid amount");
    }
    const newTxn: Transaction = {
      id: uuid.v4() as string,
      type: form.type,
      amount: Number(form.amount),
      to: form.type === "send" ? form.to : undefined,
      from: form.type === "add" ? form.from : undefined,
      note: form.note || undefined,
      date: form.date.toISOString().split("T")[0],
      userId: user.id,
      category: form.category,
    };
    onSave(newTxn);
    resetForm();
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
      accessibilityViewIsModal={true}
    >
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
          onClose();
        }}
      >
        <View style={styles.overlay}>
          <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            accessible={false}
          >
            <View style={styles.container}>
              <Text textType="largeBold" style={styles.header}>
                Add Expense
              </Text>
              <View style={styles.switchRow}>
                <TouchableOpacity
                  onPress={() => updateForm("type", "send")}
                  style={[
                    styles.switchBtn,
                    form.type === "send" && styles.active,
                  ]}
                  accessibilityRole="button"
                  accessibilityState={{ selected: form.type === "send" }}
                  accessibilityLabel="Mark expense as Spent"
                >
                  <Text
                    style={
                      form.type === "send"
                        ? styles.activeText
                        : styles.inactiveText
                    }
                  >
                    Spent
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => updateForm("type", "add")}
                  style={[
                    styles.switchBtn,
                    form.type === "add" && styles.active,
                  ]}
                  accessibilityRole="button"
                  accessibilityState={{ selected: form.type === "add" }}
                  accessibilityLabel="Mark expense as Added"
                >
                  <Text
                    style={
                      form.type === "add"
                        ? styles.activeText
                        : styles.inactiveText
                    }
                  >
                    Received
                  </Text>
                </TouchableOpacity>
              </View>
              <TextInput
                placeholder="Amount"
                keyboardType="numeric"
                style={styles.input}
                value={form.amount}
                onChangeText={(amount) => updateForm("amount", amount)}
                accessibilityLabel="Enter amount"
                accessibilityHint="Input the expense amount in numbers"
              />
              {form.type === "send" && (
                <TextInput
                  placeholder="To (optional)"
                  style={styles.input}
                  value={form.to}
                  onChangeText={(to) => updateForm("to", to)}
                  accessibilityLabel="Recipient name"
                  accessibilityHint="Input the Recipient name"
                />
              )}
              {form.type === "add" && (
                <TextInput
                  placeholder="From (optional)"
                  style={styles.input}
                  value={form.from}
                  onChangeText={(from) => updateForm("from", from)}
                  accessibilityLabel="Sender name"
                  accessibilityHint="Input the Sender name"
                />
              )}
              <TextInput
                placeholder="Note (optional)"
                style={styles.input}
                value={form.note}
                onChangeText={(note) => updateForm("note", note)}
                accessibilityLabel="Additional note"
                accessibilityHint="Input the Additional note"
              />
              <Text
                textType="semiRegular"
                style={styles.label}
                accessibilityRole="header"
                importantForAccessibility="no"
              >
                Select Category
              </Text>
              <FlatList
                horizontal
                data={categories}
                keyExtractor={(item) => item}
                renderItem={({ item: cat }) => (
                  <TouchableOpacity
                    key={cat}
                    style={[
                      styles.categoryChip,
                      form.category === cat && styles.selectedCategoryChip,
                    ]}
                    onPress={() => updateForm("category", cat)}
                    accessibilityRole="button"
                    accessibilityState={{ selected: form.category === cat }}
                    accessibilityLabel={`Category ${cat}`}
                  >
                    <MaterialCommunityIcons
                      name="tag-outline"
                      size={16}
                      color={
                        form.category === cat ? colors.ivory : colors.granite
                      }
                      accessibilityElementsHidden
                    />
                    <Text
                      textType="semiRegular"
                      style={[
                        styles.categoryChipText,
                        form.category === cat && { color: colors.ivory },
                      ]}
                    >
                      {cat}
                    </Text>
                  </TouchableOpacity>
                )}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingVertical: 4 }}
              />
              <TouchableOpacity
                onPress={() => setShowDatePicker(true)}
                accessibilityRole="button"
                accessibilityLabel={`Select date. Currently ${form.date.toDateString()}`}
              >
                <Text textType="baseRegular" style={styles.dateText}>
                  📅 {form.date.toDateString()}
                </Text>
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={form.date}
                  mode="date"
                  display={Platform.OS === "ios" ? "inline" : "default"}
                  onChange={(e, selectedDate) => {
                    setShowDatePicker(false);
                    if (selectedDate) updateForm("date", selectedDate);
                  }}
                />
              )}
              <View style={styles.buttonRow}>
                <TouchableOpacity
                  onPress={onClose}
                  style={styles.cancel}
                  accessibilityRole="button"
                  accessibilityLabel="Cancel and close the modal"
                >
                  <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleSave}
                  style={styles.save}
                  accessibilityRole="button"
                  accessibilityLabel="Save this expense"
                >
                  <Text textType="baseRegularBold" style={styles.saveText}>
                    Save
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
