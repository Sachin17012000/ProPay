import React, { useState } from "react";
import { View, Alert, TouchableOpacity, ScrollView } from "react-native";
import styles from "./style";
import Text from "../../CommonComponent/Text";
import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import { logoutThunk } from "../../store/features/user/userThunk";
import { getInitials } from "../../utils/utils";
import { setBudget } from "../../store/features/expenseTracker/expenseSlice";
import BudgetModal from "../../CommonComponent/BudgetModal";
import colors from "../../CommonComponent/Theme/Color";
import ProfileDetailsCard from "../../CommonComponent/ProfileDetailsCard";

export default function ProfileScreen() {
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.user);
  const budgets = useAppSelector((state) => state.expenses.budgets);
  const [budgetModalVisible, setBudgetModalVisible] = useState(false);
  const [budgetsState, setBudgetsState] = useState({
    Daily: budgets.find((b) => b.period === "Daily")?.amount.toString() ?? "",
    Weekly: budgets.find((b) => b.period === "Weekly")?.amount.toString() ?? "",
    Monthly:
      budgets.find((b) => b.period === "Monthly")?.amount.toString() ?? "",
  });

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => dispatch(logoutThunk()),
      },
    ]);
  };

  const handleSaveBudget = () => {
    const { Daily, Weekly, Monthly } = budgetsState;
    if (Daily && Weekly && Monthly) {
      dispatch(setBudget({ period: "Daily", amount: Number(Daily) }));
      dispatch(setBudget({ period: "Weekly", amount: Number(Weekly) }));
      dispatch(setBudget({ period: "Monthly", amount: Number(Monthly) }));
      setBudgetModalVisible(false);
    } else {
      Alert.alert("Error", "Please fill in all budget fields.");
    }
  };
  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <Text textType="headingBold" style={styles.title}>
          Profile
        </Text>
        <View style={styles.profileCircle}>
          <Text textType="largeBold" style={styles.initials}>
            {getInitials(user)}
          </Text>
        </View>
        <ProfileDetailsCard />
        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.green }]}
          onPress={() => setBudgetModalVisible(true)}
        >
          <Text textType="baseRegularBold" style={styles.buttonText}>
            Set Budget
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.dangerRed }]}
          onPress={handleLogout}
        >
          <Text textType="baseRegularBold" style={styles.buttonText}>
            Log Out
          </Text>
        </TouchableOpacity>
      </ScrollView>
      <BudgetModal
        visible={budgetModalVisible}
        onClose={() => setBudgetModalVisible(false)}
        budgets={budgetsState}
        setBudgets={setBudgetsState}
        onSave={handleSaveBudget}
      />
    </>
  );
}
