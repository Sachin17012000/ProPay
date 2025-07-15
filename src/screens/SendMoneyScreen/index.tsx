import React, { useState } from "react";
import {
  ScrollView,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import styles from "./style";
import Text from "../../CommonComponent/Text";
import Input from "../../CommonComponent/Input";
import { useAppNavigation } from "../../hooks/useAppNavigation";
import { useAuth } from "../../context/AuthContext";
import { useForm } from "react-hook-form";
import Toast from "react-native-toast-message";

type FormData = {
  to: string;
  amount: number;
  note?: string;
};

export default function SendMoneyScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      to: "",
      amount: undefined,
      note: "",
    },
  });

  const navigation = useAppNavigation();
  const { sendMoney, user } = useAuth();
  const [loading, setLoading] = useState(false);

  const onSubmit = (data: FormData) => {
    if (data.amount > user.balance) {
      Alert.alert("Insufficient Balance", "You don't have enough balance.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      sendMoney(data.to, data.amount, data.note);
      Toast.show({
        type: "success",
        text1: "Success",
        text2: `₹${data.amount} sent to ${data.to}`,
      });
      setLoading(false);
      navigation.goBack();
    }, 2000);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text textType="headingBold" style={styles.title}>
          Send Money
        </Text>

        <Input
          name="to"
          label="Recipient"
          placeholder="Enter recipient name"
          control={control}
          error={errors.to?.message}
          rules={{ required: "Recipient name is required" }}
        />

        <Input
          name="amount"
          label="Amount"
          placeholder="Enter amount"
          keyboardType="numeric"
          control={control}
          error={errors.amount?.message}
          rules={{
            required: "Amount is required",
            min: { value: 1, message: "Amount must be greater than 0" },
            validate: (value) =>
              !isNaN(Number(value)) || "Enter a valid number",
          }}
        />

        <Input
          name="note"
          label="Note"
          placeholder="Enter note (optional)"
          control={control}
          error={errors.note?.message}
        />

        <TouchableOpacity
          style={styles.sendButton}
          onPress={handleSubmit(onSubmit)}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text textType="baseRegularBold" style={styles.sendButtonText}>
              Send Money
            </Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
