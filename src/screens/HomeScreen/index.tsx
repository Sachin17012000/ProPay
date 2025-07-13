import React from "react";
import { View, ScrollView, TouchableOpacity, Button } from "react-native";
import Text from "../../CommonComponent/Text";
import styles from "./style";
import { useAuth } from "../../context/AuthContext";
import { useAppNavigation } from "../../hooks/useAppNavigation";

const transactions = [
  { name: "Netflix", money: "- ₹500" },
  { name: "Received from John", money: "+ ₹1500" },
  { name: "Amazon", money: "- ₹1200" },
];
export default function HomeScreen() {
  const navigation = useAppNavigation();
  const { logout, user } = useAuth();
  console.log(user);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text textType="baseMediumBold" style={styles.greeting}>
        Welcome back, {user.name} 👋
      </Text>

      <View style={styles.balanceCard}>
        <Text textType="semiRegular" style={styles.balanceLabel}>
          Wallet Balance
        </Text>
        <Text textType="headingBold" style={styles.balanceAmount}>
          ₹{user?.balance ?? 0}
        </Text>
        <Text textType="smallRegular" style={styles.lastUpdated}>
          Updated: 10 Jul 2025
        </Text>
      </View>

      <View style={styles.actionsRow}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate("AddMoney")}
        >
          <Text textType="baseRegularBold" style={styles.actionText}>
            Add Money
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>Send Money</Text>
        </TouchableOpacity>
      </View>

      <Text textType="mediumSemiBold" style={styles.sectionTitle}>
        {user.transactions.length == 0
          ? "Start Using App to Get Transactions"
          : "Recent Transactions"}
      </Text>
      {user?.transactions.map((transaction) => (
        <View key={transaction.id} style={styles.transactionCard}>
          <View style={styles.rowBetween}>
            <Text textType="baseRegular" style={styles.transactionName}>
              {transaction.type === "send"
                ? `Sent to ${transaction.to ?? "Unknown"}`
                : `Added to Wallet`}
            </Text>
            <Text
              textType="baseRegularBold"
              style={[
                styles.transactionAmount,
                { color: transaction.type === "add" ? "green" : "red" },
              ]}
            >
              {transaction.type === "add" ? "+ " : "- "}₹{transaction.amount}
            </Text>
          </View>

          <View style={styles.rowBetween}>
            <Text textType="smallRegular" style={styles.transactionDate}>
              {transaction.date}
            </Text>
            {transaction.note && (
              <Text textType="smallRegular" style={styles.transactionNote}>
                Note: {transaction.note}
              </Text>
            )}
          </View>
        </View>
      ))}

      <Button
        title="LogOut"
        onPress={() => {
          logout();
        }}
      />
    </ScrollView>
  );
}
