import React from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Text from "../../CommonComponent/Text";
import uuid from "react-native-uuid";
import styles from "./style";
import Input from "../../CommonComponent/Input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAppNavigation } from "../../hooks/useAppNavigation";
import Toast from "react-native-toast-message";
import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import { updateUserThunk } from "../../store/features/user/userThunk";
import { unwrapResult } from "@reduxjs/toolkit";
import { createTransaction } from "../../store/features/transactions/transactionThunk";
import colors from "../../CommonComponent/Theme/Color";
import { formatCurrency } from "../../utils/utils";

const schema = yup.object().shape({
  amount: yup
    .number()
    .typeError("Enter a valid amount")
    .positive("Amount must be positive")
    .required("Amount is required"),
});

type FormData = {
  amount: number;
};

export default function AddMoneyScreen() {
  const dispatch = useAppDispatch();
  const navigation = useAppNavigation();
  const { user, loading } = useAppSelector((state) => state.user);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    if (!user) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "No user found. Please log in again.",
      });
      return;
    }
    const newBalance = user.balance + data.amount;
    try {
      const updateResult = await dispatch(
        updateUserThunk({ balance: newBalance })
      );
      unwrapResult(updateResult);
      const txnResult = await dispatch(
        createTransaction({
          id: uuid.v4() as string,
          userId: user.id,
          from: "Bank",
          to: user.name,
          amount: data.amount,
          note: "Money Added",
          type: "add",
          date: new Date().toISOString().split("T")[0],
        })
      );
      unwrapResult(txnResult);
      Toast.show({
        type: "success",
        text1: "Success",
        text2: `₹${data.amount} added to your wallet`,
      });
      navigation.goBack();
    } catch (err: any) {
      console.log(err);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: err?.message || "Failed to add money",
      });
    }
  };

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        loading && { opacity: 0.6, pointerEvents: "none" },
      ]}
    >
      <Text textType="headingBold" style={styles.title}>
        Add Money
      </Text>
      <Text textType="baseRegularBold" style={styles.balanceLabel}>
        Wallet Balance: {formatCurrency(user.balance)}
      </Text>
      <Input
        placeholder="Enter amount"
        keyboardType="numeric"
        name="amount"
        control={control}
        error={errors.amount?.message}
      />
      <View style={styles.paymentMethodBox}>
        <Text textType="baseRegular">Pay via:</Text>
        <Text textType="baseMediumBold">Wallet Balance</Text>
      </View>
      <TouchableOpacity
        style={styles.addButton}
        onPress={handleSubmit(onSubmit)}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color={colors.ivory} />
        ) : (
          <Text textType="baseRegularBold" style={styles.addButtonText}>
            Add Money
          </Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}
