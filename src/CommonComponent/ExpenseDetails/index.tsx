import { TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Text from "../Text";
import { formatCurrency, getToggleTitle } from "../../utils/utils";
import { toggleArray } from "../../utils/staticData";
import styles from "./style";
import SkeletonView from "../skeletonView";

interface ExpenseDetailsProps {
  selectedBudget: number;
  totalSpent: number;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  setBudgetModalVisible: (visible: boolean) => void;
  loading: boolean;
}
export default function ExpenseDetails({
  selectedBudget,
  totalSpent,
  activeTab,
  setActiveTab,
  setBudgetModalVisible,
  loading,
}: ExpenseDetailsProps) {
  const percentUsed = selectedBudget
    ? Math.min((totalSpent / selectedBudget) * 100, 100)
    : 0;
  return (
    <>
      <View style={styles.expenseSummaryHeader}>
        <MaterialCommunityIcons
          name="chart-bar"
          size={18}
          style={styles.chartBarIconStyle}
        />
        <Text textType="baseRegular" style={styles.title}>
          This {getToggleTitle(activeTab)}
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
      {loading ? (
        <SkeletonView CardStyle={{ marginTop: 20, height: 165 }} />
      ) : (
        <View style={styles.summarySection}>
          <Text textType="semiRegular" style={styles.summaryLine}>
            Total Spent: {formatCurrency(totalSpent)}
          </Text>
          <Text textType="semiRegular" style={styles.summaryLine}>
            Budget: {formatCurrency(selectedBudget)}
          </Text>
          <Text textType="semiRegular" style={styles.summaryLine}>
            Remaining: {formatCurrency(selectedBudget - totalSpent)}
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
      )}
    </>
  );
}
