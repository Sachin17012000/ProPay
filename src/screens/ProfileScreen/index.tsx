import React from "react";
import {
  View,
  Alert,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from "react-native";
import styles from "./style";
import Text from "../../CommonComponent/Text";
import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import {
  logoutThunk,
  updateUserThunk,
} from "../../store/features/user/userThunk";
import { getInitials } from "../../utils/utils";
import { setBudget } from "../../store/features/expenseTracker/expenseSlice";
import BudgetModal from "../../CommonComponent/BudgetModal";

export default function ProfileScreen() {
  const dispatch = useAppDispatch();
  const { loading, user } = useAppSelector((state) => state.user);
  const transactions = useAppSelector(
    (state) => state.transactions.transactions
  );
  const budgets = useAppSelector((state) => state.expenses.budgets);
  const [editing, setEditing] = React.useState(false);
  const [name, setName] = React.useState(user?.name ?? "");

  const [budgetModalVisible, setBudgetModalVisible] = React.useState(false);
  const [daily, setDaily] = React.useState(
    budgets.find((b) => b.period === "Daily")?.amount.toString() ?? ""
  );
  const [weekly, setWeekly] = React.useState(
    budgets.find((b) => b.period === "Weekly")?.amount.toString() ?? ""
  );
  const [monthly, setMonthly] = React.useState(
    budgets.find((b) => b.period === "Monthly")?.amount.toString() ?? ""
  );

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
  const handleSaveName = async () => {
    if (name.trim()) {
      const resultAction = await dispatch(updateUserThunk({ name }));
      if (updateUserThunk.fulfilled.match(resultAction)) {
        setEditing(false);
      }
    } else {
      Alert.alert("Error", "Name cannot be empty.");
    }
  };

  const handleSaveBudget = () => {
    if (daily && weekly && monthly) {
      dispatch(setBudget({ period: "Daily", amount: Number(daily) }));
      dispatch(setBudget({ period: "Weekly", amount: Number(weekly) }));
      dispatch(setBudget({ period: "Monthly", amount: Number(monthly) }));
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

        <View style={styles.card}>
          <View style={styles.rowBetween}>
            <Text textType="baseRegularBold">Name:</Text>
            <TouchableOpacity onPress={() => setEditing(true)}>
              <Text textType="link">Edit</Text>
            </TouchableOpacity>
          </View>
          {editing ? (
            <TextInput
              value={name}
              onChangeText={setName}
              style={styles.input}
              placeholder="Enter new name"
            />
          ) : (
            <Text textType="baseRegular">{user?.name}</Text>
          )}
          {editing && (
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSaveName}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text textType="baseRegularBold" style={styles.saveButtonText}>
                  Save Name
                </Text>
              )}
            </TouchableOpacity>
          )}

          <Text textType="baseRegularBold" style={styles.label}>
            Email:
          </Text>
          <Text textType="baseRegular">{user?.email}</Text>

          <Text textType="baseRegularBold" style={styles.label}>
            Wallet Balance:
          </Text>
          <Text textType="baseRegular">₹{user?.balance ?? 0}</Text>
          <Text textType="baseRegularBold" style={styles.label}>
            Total Transactions:
          </Text>
          <Text textType="baseRegular">{transactions?.length ?? 0}</Text>
        </View>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#4CAF50" }]}
          onPress={() => setBudgetModalVisible(true)}
        >
          <Text textType="baseRegularBold" style={styles.buttonText}>
            Set Budget
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "red" }]}
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
        daily={daily}
        weekly={weekly}
        monthly={monthly}
        setDaily={setDaily}
        setWeekly={setWeekly}
        setMonthly={setMonthly}
        onSave={handleSaveBudget}
      />
    </>
  );
}
