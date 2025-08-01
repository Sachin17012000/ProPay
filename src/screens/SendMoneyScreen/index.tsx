import React from "react";
import {
  ScrollView,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import uuid from "react-native-uuid";
import styles from "./style";
import Text from "../../CommonComponent/Text";
import Input from "../../CommonComponent/Input";
import { useAppNavigation } from "../../hooks/useAppNavigation";
import { useForm } from "react-hook-form";
import Toast from "react-native-toast-message";
import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import { updateUserThunk } from "../../store/features/user/userThunk";
import { createTransaction } from "../../store/features/transactions/transactionThunk";
import { unwrapResult } from "@reduxjs/toolkit";

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
  const dispatch = useAppDispatch();
  const { user, loading } = useAppSelector((state) => state.user);

  const onSubmit = async (data: FormData) => {
    if (!user) return;
    if (data.amount > user.balance) {
      Alert.alert("Insufficient Balance", "You don't have enough balance.");
      return;
    }
    const newBalance = user.balance - data.amount;
    try {
      const balanceResult = await dispatch(
        updateUserThunk({ balance: newBalance })
      );
      unwrapResult(balanceResult);
      const txnResult = await dispatch(
        createTransaction({
          id: uuid.v4() as string,
          userId: user.id,
          to: data.to,
          amount: data.amount,
          note: data.note,
          type: "send",
          date: new Date().toISOString().split("T")[0],
          from: user.name,
        })
      );
      unwrapResult(txnResult);
      Toast.show({
        type: "success",
        text1: "Success",
        text2: `₹${data.amount} sent to ${data.to}`,
      });
      navigation.goBack();
    } catch (err: any) {
      console.log(err);
      Toast.show({
        type: "error",
        text1: "Transaction Failed",
        text2: err?.message || "An unexpected error occurred",
      });
    }
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
        <Text textType="baseRegularBold" style={styles.balanceLabel}>
          Wallet Balance: ₹{user.balance}
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
