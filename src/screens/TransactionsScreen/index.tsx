import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Alert,
  FlatList,
  RefreshControl,
} from "react-native";
import Text from "../../CommonComponent/Text";
import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import { updateTransaction } from "../../store/features/transactions/transactionSlice";
import { FilterType, Transaction } from "../../types";
import CategoryModal from "../../CommonComponent/CategoryModal";
import styles from "./style";
import colors from "../../CommonComponent/Theme/Color";
import { formatCurrency, formatDate } from "../../utils/utils";
import SkeletonView from "../../CommonComponent/skeletonView";
import FilterButtons from "../../CommonComponent/filterButtons";
import { transactionFilters } from "../../utils/staticData";

export default function TransactionsScreen() {
  const dispatch = useAppDispatch();
  const transactions = useAppSelector(
    (state) => state.transactions.transactions
  );

  const [filter, setFilter] = useState<FilterType>("all");
  const [refreshing, setRefreshing] = useState(false);
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [selectedTransactionId, setSelectedTransactionId] = useState<
    string | null
  >(null);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const filteredTransactions = [...transactions]
    .filter((txn) => (filter === "all" ? true : txn.type === filter))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const handleLongPress = (id: string, currentTracked?: boolean) => {
    Alert.alert(
      currentTracked ? "Remove from Expense Tracker" : "Add to Expense Tracker",
      currentTracked
        ? "Do you want to remove this transaction from Expense Tracker?"
        : "Do you want to track this transaction in Expense Tracker?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: currentTracked ? "Remove" : "Add",
          onPress: () => {
            currentTracked
              ? dispatch(
                  updateTransaction({
                    id,
                    changes: { isTracked: !currentTracked },
                  })
                )
              : (setSelectedTransactionId(id), setCategoryModalVisible(true));
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text textType="headingBold" style={styles.title}>
        Transaction History
      </Text>
      <FilterButtons
        filter={filter}
        setFilter={setFilter}
        buttonArray={transactionFilters}
      />
      {filteredTransactions.length === 0 ? (
        <Text textType="baseRegular" style={styles.emptyMessage}>
          No {filter} transactions found.
        </Text>
      ) : refreshing ? (
        <>
          <SkeletonView />
          <SkeletonView />
          <SkeletonView />
          <SkeletonView />
        </>
      ) : (
        <FlatList
          data={filteredTransactions}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item: txn }) => (
            <TouchableOpacity
              onLongPress={() =>
                handleLongPress(txn.id, (txn as Transaction).isTracked)
              }
              style={[
                styles.transactionCard,
                (txn as Transaction).isTracked && {
                  backgroundColor: colors.mintMist,
                },
              ]}
            >
              <View style={styles.rowBetween}>
                <Text textType="baseRegularBold" style={styles.transactionName}>
                  {txn.type === "send"
                    ? `Sent to ${txn.to ?? "Unknown"}`
                    : "Added to Wallet"}
                </Text>
                <Text
                  textType="baseRegularBold"
                  style={[
                    styles.transactionAmount,
                    {
                      color:
                        txn.type === "add" ? colors.emerald : colors.crimson,
                    },
                  ]}
                >
                  {txn.type === "add" ? "+ " : "- "}
                  {formatCurrency(txn.amount)}
                </Text>
              </View>

              <View style={styles.rowBetween}>
                <View style={styles.dateCategoryView}>
                  <Text textType="smallRegular" style={styles.transactionDate}>
                    {formatDate(txn.date)}
                  </Text>
                </View>
                {txn.note && (
                  <Text textType="smallRegular" style={styles.transactionNote}>
                    {txn.note}
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          )}
        />
      )}
      <CategoryModal
        visible={categoryModalVisible}
        onClose={() => setCategoryModalVisible(false)}
        onSelect={(category) => {
          if (selectedTransactionId) {
            dispatch(
              updateTransaction({
                id: selectedTransactionId,
                changes: { isTracked: true, category },
              })
            );
          }
          setSelectedTransactionId(null);
        }}
      />
    </View>
  );
}
