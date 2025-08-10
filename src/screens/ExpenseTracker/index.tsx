import { Alert, ScrollView, TouchableOpacity, View } from "react-native";
import Text from "../../CommonComponent/Text";
import styles from "./style";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState, useMemo } from "react";
import colors from "../../CommonComponent/Theme/Color";
import { AddExpenseModal } from "../../CommonComponent/AddExpenseModal";
import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import { RootState } from "../../store/store";
import { getCategoryIcon, normalizeDate } from "../../utils/utils";
import {
  addExpense,
  setBudget,
} from "../../store/features/expenseTracker/expenseSlice";
import BudgetModal from "../../CommonComponent/BudgetModal";

const toggleArray = [
  { title: "Daily", spent: 500, budget: 1000 },
  { title: "Weekly", spent: 1500, budget: 5000 },
  { title: "Monthly", spent: 4000, budget: 20000 },
];

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
  const [budgetModalVisible, setBudgetModalVisible] = useState(false);
  const [daily, setDaily] = useState(
    budgets.find((b) => b.period === "Daily")?.amount.toString() ?? ""
  );
  const [weekly, setWeekly] = useState(
    budgets.find((b) => b.period === "Weekly")?.amount.toString() ?? ""
  );
  const [monthly, setMonthly] = useState(
    budgets.find((b) => b.period === "Monthly")?.amount.toString() ?? ""
  );

  const getDateFilteredExpenses = () => {
    const now = new Date();
    return allExpenses.filter((txn) => {
      const txnDate = normalizeDate(new Date(txn.date));
      if (activeTab === "Daily") {
        return (
          txnDate.getDate() === now.getDate() &&
          txnDate.getMonth() === now.getMonth() &&
          txnDate.getFullYear() === now.getFullYear()
        );
      }
      if (activeTab === "Weekly") {
        const startOfWeek = normalizeDate(new Date(now));
        startOfWeek.setDate(now.getDate() - now.getDay());
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        return txnDate >= startOfWeek && txnDate <= endOfWeek;
      }
      return (
        txnDate.getMonth() === now.getMonth() &&
        txnDate.getFullYear() === now.getFullYear()
      );
    });
  };

  const filteredExpenses = getDateFilteredExpenses().filter((txn) =>
    selectedCategory ? txn.category === selectedCategory : true
  );
  const totalSpent = filteredExpenses
    .filter((txn) => txn.type === "send")
    .reduce((sum, txn) => sum + txn.amount, 0);

  const selectedBudget =
    budgets.find((item) => item.period === activeTab)?.amount || 0;

  const percentUsed = selectedBudget
    ? Math.min((totalSpent / selectedBudget) * 100, 100)
    : 0;

  const getToggleTitle = () => {
    if (activeTab === "Daily") return "Day";
    if (activeTab === "Weekly") return "Week";
    return "Month";
  };
  const handleSaveExpense = (expense) => {
    dispatch(addExpense(expense));
  };
  const categoryTotals = useMemo(() => {
    const map: Record<string, number> = {};
    getDateFilteredExpenses().forEach((txn) => {
      const cat = txn.category || "Others";
      if (!map[cat]) map[cat] = 0;
      if (txn.type === "send") {
        map[cat] += txn.amount;
      } else {
        map[cat] -= txn.amount;
      }
    });
    return Object.entries(map).map(([name, amount]) => ({
      name,
      amount,
      icon: getCategoryIcon(name),
    }));
  }, [allExpenses, activeTab]);
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
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerView}>
          <Text textType="mediumSemiBold" style={styles.title}>
            Expense Tracker
          </Text>
        </View>
        <View style={styles.expenseSummaryHeader}>
          <MaterialCommunityIcons
            name="chart-bar"
            size={18}
            style={styles.chartBarIconStyle}
          />
          <Text textType="baseRegular" style={styles.title}>
            This {getToggleTitle()}
          </Text>
        </View>
        <View style={styles.toggleSection}>
          {toggleArray.map((toggle) => (
            <TouchableOpacity
              key={toggle.title}
              style={[
                styles.toggleTitle,
                activeTab === toggle.title && styles.activeToggle,
              ]}
              onPress={() => setActiveTab(toggle.title)}
            >
              <Text
                textType="baseRegular"
                style={[
                  styles.toggleButtonText,
                  activeTab === toggle.title && styles.activeToggleButtonText,
                ]}
              >
                {toggle.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.summarySection}>
          <Text textType="semiRegular" style={styles.summaryLine}>
            Total Spent: ₹{totalSpent}
          </Text>
          <Text textType="semiRegular" style={styles.summaryLine}>
            Budget: ₹{selectedBudget}
          </Text>
          <Text textType="semiRegular" style={styles.summaryLine}>
            Remaining: ₹{selectedBudget - totalSpent}
          </Text>
          <View style={styles.progressBarBackground}>
            <View
              style={[styles.progressBarFill, { width: `${percentUsed}%` }]}
            />
          </View>
          <Text textType="smallRegular" style={styles.percentUsedText}>
            {percentUsed.toFixed(0)}% Used
          </Text>
          <TouchableOpacity
            style={styles.budgetButton}
            onPress={() => setBudgetModalVisible(true)}
          >
            <Text style={{ color: "white" }}>Set Budget</Text>
          </TouchableOpacity>
        </View>
        {categoryTotals.length > 0 && (
          <View>
            <Text textType="mediumSemiBold" style={styles.categoryTitle}>
              Category Breakdown
            </Text>
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
                    ₹{category.amount}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
        <Text textType="mediumSemiBold" style={styles.transactionTitle}>
          Recent Transactions
        </Text>
        {filteredExpenses.length === 0 ? (
          <View style={styles.emptyState}>
            <MaterialCommunityIcons
              name="file-document-outline"
              size={50}
              color={colors.ash}
            />
            <Text textType="baseRegular" style={styles.emptyText}>
              No transactions yet. Tap + to add one!
            </Text>
          </View>
        ) : (
          <View style={styles.transactionList}>
            {filteredExpenses.map((item) => (
              <View key={item.id} style={styles.transactionItem}>
                <View style={styles.transactionInfo}>
                  <Text textType="baseSemiBold">
                    {item.category || "Uncategorized"}
                  </Text>
                  <Text
                    textType="smallRegular"
                    style={{ color: colors.noteGrey }}
                  >
                    {item.date} • {item.note?.trim() ? item.note : "(No Note)"}{" "}
                    {item.type === "send"
                      ? item.to?.trim()
                        ? `• To: ${item.to}`
                        : "• Sent"
                      : "• Received"}
                  </Text>
                </View>
                <Text
                  textType="baseSemiBold"
                  style={{
                    color: item.type === "add" ? "green" : "red",
                  }}
                >
                  {item.type === "add" ? "+" : "-"}₹{item.amount}
                </Text>
              </View>
            ))}
          </View>
        )}
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
        daily={daily}
        weekly={weekly}
        monthly={monthly}
        setDaily={setDaily}
        setWeekly={setWeekly}
        setMonthly={setMonthly}
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
