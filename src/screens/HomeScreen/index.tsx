import React from "react";
import { View, ScrollView, TouchableOpacity, Button } from "react-native";
import Text from "../../CommonComponent/Text";
import styles from "./style";
import { useAuth } from "../../context/AuthContext";

const transactions = [
  { name: "Netflix", money: "- ₹500" },
  { name: "Received from John", money: "+ ₹1500" },
  { name: "Amazon", money: "- ₹1200" },
];
export default function HomeScreen() {
  const { logout } = useAuth();
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text textType="baseMediumBold" style={styles.greeting}>
        Welcome back, Sachin 👋
      </Text>

      <View style={styles.balanceCard}>
        <Text textType="semiRegular" style={styles.balanceLabel}>
          Wallet Balance
        </Text>
        <Text textType="headingBold" style={styles.balanceAmount}>
          ₹12,500.00
        </Text>
        <Text textType="smallRegular" style={styles.lastUpdated}>
          Updated: 10 Jul 2025
        </Text>
      </View>

      <View style={styles.actionsRow}>
        <TouchableOpacity style={styles.actionButton}>
          <Text textType="baseRegularBold" style={styles.actionText}>
            Add Money
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>Send Money</Text>
        </TouchableOpacity>
      </View>

      <Text textType="mediumSemiBold" style={styles.sectionTitle}>
        Recent Transactions
      </Text>
      {transactions.map((transaction) => (
        <View key={transaction.name} style={styles.transactionCard}>
          <Text textType="baseRegular" style={styles.transactionName}>
            {transaction.name}
          </Text>
          <Text textType="baseRegularBold" style={styles.transactionAmount}>
            {transaction.money}
          </Text>
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
