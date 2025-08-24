import { FlatList, TouchableOpacity, View } from "react-native";
import Text from "../Text";
import colors from "../Theme/Color";
import { formatCurrency, formatDate } from "../../utils/utils";
import styles from "./style";
import { useAppNavigation } from "../../hooks/useAppNavigation";
import { Transaction } from "../../types";
import SkeletonView from "../skeletonView";

interface HomeScreenTransactionsProps {
  loading: boolean;
  transactions: Transaction[];
  error: string;
}
export default function HomeScreenTransactions({
  loading,
  transactions,
  error,
}: HomeScreenTransactionsProps) {
  const navigation = useAppNavigation();

  const renderTransaction = ({ item }: any) => (
    <View style={styles.transactionCard}>
      <View style={styles.rowBetween}>
        <Text textType="baseRegular" style={styles.transactionName}>
          {item.type === "send"
            ? `Sent to ${item.to ?? "Unknown"}`
            : `Added to Wallet`}
        </Text>
        <Text
          textType="baseRegularBold"
          style={[
            styles.transactionAmount,
            {
              color: item.type === "add" ? colors.emerald : colors.dangerRed,
            },
          ]}
        >
          {item.type === "add" ? "+ " : "- "}
          {formatCurrency(item.amount)}
        </Text>
      </View>
      <View style={styles.rowBetween}>
        <Text textType="smallRegular" style={styles.transactionDate}>
          {formatDate(item.date)}
        </Text>
        {item.note && (
          <Text textType="smallRegular" style={styles.transactionNote}>
            Note: {item.note}
          </Text>
        )}
      </View>
    </View>
  );
  return (
    <>
      <Text textType="mediumSemiBold" style={styles.sectionTitle}>
        {loading
          ? "Loading transactions..."
          : transactions.length === 0
          ? "Start Using App to Get Transactions"
          : "Recent Transactions"}
      </Text>
      {error && (
        <Text textType="mediumSemiBold" style={styles.sectionTitle}>
          {error}
        </Text>
      )}
      {loading ? (
        <>
          <SkeletonView />
          <SkeletonView />
          <SkeletonView />
          <SkeletonView />
        </>
      ) : (
        <FlatList
          data={transactions.slice(0, 4)}
          keyExtractor={(item) => item.id}
          renderItem={renderTransaction}
          scrollEnabled={false}
          ListFooterComponent={
            transactions.length > 4 ? (
              <TouchableOpacity
                style={styles.viewAllButton}
                onPress={() => navigation.navigate("Transactions")}
              >
                <Text
                  textType="baseRegularBold"
                  style={styles.viewAllButtonText}
                >
                  View All Transactions →
                </Text>
              </TouchableOpacity>
            ) : null
          }
        />
      )}
    </>
  );
}
