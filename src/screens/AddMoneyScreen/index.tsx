import React from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import Text from "../../CommonComponent/Text";
import styles from "./style";
import Input from "../../CommonComponent/Input";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "../../context/AuthContext";
import { useAppNavigation } from "../../hooks/useAppNavigation";

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
  const { addMoney, user } = useAuth();
  const navigation = useAppNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log(data);

    addMoney(data.amount);
    navigation.goBack();
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text textType="headingBold" style={styles.title}>
        Add Money
      </Text>

      <Text textType="baseRegularBold" style={styles.balanceLabel}>
        Wallet Balance: ₹{user.balance}
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
        <Text textType="baseMediumBold">UPI (test mode)</Text>
      </View>

      <TouchableOpacity
        style={styles.addButton}
        onPress={handleSubmit(onSubmit)}
      >
        <Text textType="baseRegularBold" style={styles.addButtonText}>
          Add Money
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
