import { TouchableOpacity, View } from "react-native";
import Text from "../Text";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../Theme/Color";
import styles from "./style";
import { Transaction } from "../../types";

interface ExpenseTransactionsProps {
  filteredExpenses: Transaction[];
  handleLongPress: (id: string) => void;
}
export default function ExpenseTransactions({
  filteredExpenses,
  handleLongPress,
}: ExpenseTransactionsProps) {
  return (
    <>
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
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.7}
              style={styles.transactionItem}
              onLongPress={() => handleLongPress(item.id)}
            >
              <View style={styles.transactionInfo}>
                <Text style={styles.transactionCategory}>
                  {item.category || "Uncategorized"}
                </Text>
                <Text style={styles.transactionMeta}>
                  {item.date} • {item.note?.trim() ? item.note : "(No Note)"}{" "}
                  {item.type === "send"
                    ? item.to?.trim()
                      ? `• To: ${item.to}`
                      : "• Sent"
                    : "• Received"}
                </Text>
              </View>
              <Text
                style={[
                  {
                    color:
                      item.type === "add" ? colors.emerald : colors.dangerRed,
                  },
                ]}
              >
                {item.type === "add" ? "+" : "-"}₹
                {Number(item.amount).toLocaleString("en-IN")}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </>
  );
}
