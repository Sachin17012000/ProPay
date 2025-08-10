import React, { useState } from "react";
import {
  Modal,
  View,
  TextInput,
  TouchableOpacity,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
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
  const [type, setType] = useState<"send" | "add">("send");
  const [amount, setAmount] = useState("");
  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");
  const [note, setNote] = useState("");
  const [category, setCategory] = useState("Others");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const reset = () => {
    setType("send");
    setAmount("");
    setTo("");
    setFrom("");
    setNote("");
    setCategory("Others");
    setDate(new Date());
  };

  const handleSave = () => {
    if (!amount || isNaN(Number(amount))) {
      return alert("Please enter a valid amount");
    }
    const newTxn: Transaction = {
      id: uuid.v4() as string,
      type,
      amount: Number(amount),
      to: type === "send" ? to : undefined,
      from: type === "add" ? from : undefined,
      note: note || undefined,
      date: date.toISOString().split("T")[0],
      userId: user.id,
      category,
    };
    onSave(newTxn);
    reset();
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
          onClose();
        }}
      >
        <View style={styles.overlay}>
          <View style={styles.container}>
            <Text textType="largeBold" style={styles.header}>
              Add Expense
            </Text>
            <View style={styles.switchRow}>
              <TouchableOpacity
                onPress={() => setType("send")}
                style={[styles.switchBtn, type === "send" && styles.active]}
              >
                <Text
                  style={
                    type === "send" ? styles.activeText : styles.inactiveText
                  }
                >
                  Send
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setType("add")}
                style={[styles.switchBtn, type === "add" && styles.active]}
              >
                <Text
                  style={
                    type === "add" ? styles.activeText : styles.inactiveText
                  }
                >
                  Add
                </Text>
              </TouchableOpacity>
            </View>
            <TextInput
              placeholder="Amount"
              keyboardType="numeric"
              style={styles.input}
              value={amount}
              onChangeText={setAmount}
            />
            {type === "send" && (
              <TextInput
                placeholder="To (optional)"
                style={styles.input}
                value={to}
                onChangeText={setTo}
              />
            )}
            {type === "add" && (
              <TextInput
                placeholder="From (optional)"
                style={styles.input}
                value={from}
                onChangeText={setFrom}
              />
            )}
            <TextInput
              placeholder="Note (optional)"
              style={styles.input}
              value={note}
              onChangeText={setNote}
            />
            <Text textType="semiRegular" style={styles.label}>
              Select Category
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {categories.map((cat) => (
                <TouchableOpacity
                  key={cat}
                  style={[
                    styles.categoryChip,
                    category === cat && styles.selectedCategoryChip,
                  ]}
                  onPress={() => setCategory(cat)}
                >
                  <MaterialCommunityIcons
                    name="tag-outline"
                    size={16}
                    color={category === cat ? colors.ivory : colors.granite}
                  />
                  <Text
                    textType="semiRegular"
                    style={[
                      styles.categoryChipText,
                      category === cat && { color: colors.ivory },
                    ]}
                  >
                    {cat}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
              <Text textType="baseRegular" style={styles.dateText}>
                📅 {date.toDateString()}
              </Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={date}
                mode="date"
                display={Platform.OS === "ios" ? "inline" : "default"}
                onChange={(e, selectedDate) => {
                  setShowDatePicker(false);
                  if (selectedDate) setDate(selectedDate);
                }}
              />
            )}
            <View style={styles.buttonRow}>
              <TouchableOpacity onPress={onClose} style={styles.cancel}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSave} style={styles.save}>
                <Text textType="baseRegularBold" style={styles.saveText}>
                  Save
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
