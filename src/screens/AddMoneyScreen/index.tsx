import React, { useState } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Text from "../../CommonComponent/Text";
import styles from "./style";
import Input from "../../CommonComponent/Input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "../../context/AuthContext";
import { useAppNavigation } from "../../hooks/useAppNavigation";
import Toast from "react-native-toast-message";

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
  const [loading, setLoading] = useState(false);
  const onSubmit = (data: FormData) => {
    setLoading(true);
    setTimeout(() => {
      addMoney(data.amount);
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Money added to your wallet",
      });
      setLoading(false);
      navigation.goBack();
    }, 2000);
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
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text textType="baseRegularBold" style={styles.addButtonText}>
            Add Money
          </Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}
