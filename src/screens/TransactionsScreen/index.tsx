import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Alert,
  FlatList,
  RefreshControl,
} from "react-native";
import styles from "./style";
import Text from "../../CommonComponent/Text";
import { useAppSelector } from "../../hooks/hook";

type FilterType = "all" | "send" | "add";

export default function TransactionsScreen() {
  const [filter, setFilter] = useState<FilterType>("all");
  const [refreshing, setRefreshing] = useState(false);
  const transactions = useAppSelector(
    (state) => state.transactions.transactions
  );

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };
  const filteredTransactions = [...transactions]
    .filter((txn) => {
      if (filter === "all") return true;
      return txn.type === filter;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const handleDelete = (id: string) => {
    Alert.alert("Delete", "Are you sure you want to delete this transaction?", [
      { text: "Cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          // deleteTransaction(id);
        },
      },
    ]);
  };

  const renderFilterButton = (type: FilterType, label: string) => (
    <TouchableOpacity
      key={type}
      style={[
        styles.filterButton,
        filter === type && styles.activeFilterButton,
      ]}
      onPress={() => setFilter(type)}
    >
      <Text
        textType="baseRegular"
        style={[
          styles.filterButtonText,
          filter === type && styles.activeFilterButtonText,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text textType="headingBold" style={styles.title}>
        Transaction History
      </Text>
      <View style={styles.filterContainer}>
        {renderFilterButton("all", "All")}
        {renderFilterButton("send", "Sent")}
        {renderFilterButton("add", "Added")}
      </View>
      {filteredTransactions.length === 0 ? (
        <Text textType="baseRegular" style={styles.emptyMessage}>
          No {filter} transactions found.
        </Text>
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
              // onLongPress={() => handleDelete(txn.id)}
              style={styles.transactionCard}
            >
              <View style={styles.rowBetween}>
                <Text textType="baseRegular" style={styles.transactionName}>
                  {txn.type === "send"
                    ? `Sent to ${txn.to ?? "Unknown"}`
                    : "Added to Wallet"}
                </Text>
                <Text
                  textType="baseRegularBold"
                  style={[
                    styles.transactionAmount,
                    { color: txn.type === "add" ? "green" : "red" },
                  ]}
                >
                  {txn.type === "add" ? "+ " : "- "}₹{txn.amount}
                </Text>
              </View>
              <View style={styles.rowBetween}>
                <Text textType="smallRegular" style={styles.transactionDate}>
                  {txn.date}
                </Text>
                {txn.note && (
                  <Text textType="smallRegular" style={styles.transactionNote}>
                    Note: {txn.note}
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}
