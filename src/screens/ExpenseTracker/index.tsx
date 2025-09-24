import {
  Alert,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import Text from "../../CommonComponent/Text";
import styles from "./style";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState, useMemo } from "react";
import colors from "../../CommonComponent/Theme/Color";
import { AddExpenseModal } from "../../CommonComponent/AddExpenseModal";
import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import { RootState } from "../../store/store";
import {
  formatCurrency,
  getCategoryIcon,
  getDateFilteredExpenses,
} from "../../utils/utils";
import {
  addExpense,
  deleteExpense,
  setBudget,
} from "../../store/features/expenseTracker/expenseSlice";
import BudgetModal from "../../CommonComponent/BudgetModal";
import ExpenseDetails from "../../CommonComponent/ExpenseDetails";
import ExpenseTransactions from "../../CommonComponent/ExpenseTransactions";
import SkeletonView from "../../CommonComponent/skeletonView";

export default function ExpenseTracker() {
  const dispatch = useAppDispatch();

  const realTransactions = useAppSelector(
    (state: RootState) => state.transactions.transactions
  ).filter((txn) => txn.isTracked);
  const manualExpenses = useAppSelector(
    (state: RootState) => state.expenses.expenses
  );
  const budgets = useAppSelector((state: RootState) => state.expenses.budgets);

  const allExpenses = [...realTransactions, ...manualExpenses];

  const [activeTab, setActiveTab] = useState("Monthly");
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [budgetModalVisible, setBudgetModalVisible] = useState(false);
  const [budgetsState, setBudgetsState] = useState({
    Daily: budgets.find((b) => b.period === "Daily")?.amount.toString() ?? "",
    Weekly: budgets.find((b) => b.period === "Weekly")?.amount.toString() ?? "",
    Monthly:
      budgets.find((b) => b.period === "Monthly")?.amount.toString() ?? "",
  });

  const filteredExpenses = getDateFilteredExpenses(
    allExpenses,
    activeTab
  ).filter((txn) =>
    selectedCategory ? txn.category === selectedCategory : true
  );

  const totalSpent = filteredExpenses
    .filter((txn) => txn.type === "send")
    .reduce((sum, txn) => sum + Number(txn.amount), 0);

  const selectedBudget =
    budgets.find((item) => item.period === activeTab)?.amount || 0;

  const handleSaveExpense = (expense) => {
    dispatch(addExpense(expense));
  };
  const categoryTotals = useMemo(() => {
    const map: Record<string, number> = {};
    getDateFilteredExpenses(allExpenses, activeTab).forEach((txn) => {
      const cat = txn.category || "Others";
      if (!map[cat]) map[cat] = 0;
      const amount = Number(txn.amount);
      if (txn.type === "send") {
        map[cat] += amount;
      } else {
        map[cat] -= amount;
      }
    });
    return Object.entries(map).map(([name, amount]) => ({
      name,
      amount,
      icon: getCategoryIcon(name),
    }));
  }, [allExpenses, activeTab]);
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
  const handleLongPress = (id: string) => {
    const isManual = manualExpenses.some((exp) => exp.id === id);

    Alert.alert(
      "Delete Expense",
      isManual
        ? "Are you sure you want to delete this expense?"
        : "This is a synced transaction and You can delete it from Transactions.",
      isManual
        ? [
            { text: "Cancel", style: "cancel" },
            {
              text: "Delete",
              style: "destructive",
              onPress: () => dispatch(deleteExpense(id)),
            },
          ]
        : [{ text: "OK" }]
    );
  };
  const onRefresh = async () => {
    setRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setRefreshing(false);
  };
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.headerView}>
          <Text
            textType="mediumSemiBold"
            style={styles.title}
            accessibilityRole="header"
          >
            Expense Tracker
          </Text>
        </View>
        <ExpenseDetails
          selectedBudget={selectedBudget}
          totalSpent={totalSpent}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          setBudgetModalVisible={setBudgetModalVisible}
          loading={refreshing}
        />

        {categoryTotals.length > 0 && (
          <View>
            <Text textType="mediumSemiBold" style={styles.categoryTitle}>
              Category Breakdown
            </Text>
            {refreshing ? (
              <SkeletonView />
            ) : (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoryScrollView}
                style={{ maxHeight: 100 }}
              >
                {categoryTotals.map((category) => (
                  <TouchableOpacity
                    key={category.name}
                    style={[
                      styles.categoryCard,
                      selectedCategory === category.name && {
                        backgroundColor: colors.blue + "20",
                      },
                    ]}
                    onPress={() => {
                      setSelectedCategory((prev) =>
                        prev === category.name ? null : category.name
                      );
                    }}
                  >
                    <MaterialCommunityIcons
                      name={category.icon as any}
                      size={24}
                      color={colors.blue}
                      style={{ marginBottom: 4 }}
                    />
                    <Text textType="baseSemiBold" style={styles.categoryText}>
                      {category.name}
                    </Text>
                    <Text textType="smallRegular" style={styles.categoryAmount}>
                      {formatCurrency(category.amount)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}
          </View>
        )}
        <ExpenseTransactions
          handleLongPress={handleLongPress}
          filteredExpenses={filteredExpenses}
          loading={refreshing}
        />
      </ScrollView>
      <AddExpenseModal
        visible={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={(newExpense) => {
          handleSaveExpense(newExpense);
        }}
      />
      <BudgetModal
        visible={budgetModalVisible}
        onClose={() => setBudgetModalVisible(false)}
        budgets={budgetsState}
        setBudgets={setBudgetsState}
        onSave={handleSaveBudget}
      />
      <TouchableOpacity
        style={styles.fabButton}
        onPress={() => setShowAddModal(true)}
      >
        <MaterialCommunityIcons name="plus" size={26} color={colors.ivory} />
      </TouchableOpacity>
    </View>
  );
}
