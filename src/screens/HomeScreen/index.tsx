import { Animated } from "react-native";
import { useEffect, useRef } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Text from "../../CommonComponent/Text";
import styles from "./style";
import { useAppNavigation } from "../../hooks/useAppNavigation";
import { LinearGradient } from "expo-linear-gradient";
import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import { fetchTransactionsByUser } from "../../store/features/transactions/transactionThunk";

export default function HomeScreen() {
  const dispatch = useAppDispatch();
  const navigation = useAppNavigation();

  const user = useAppSelector((state) => state.user.user);
  const transactions = useAppSelector(
    (state) => state.transactions.transactions
  );
  const loading = useAppSelector((state) => state.transactions.loading);
  const error = useAppSelector((state) => state.transactions.error);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchTransactionsByUser(user.id));
    }
  }, [dispatch, user?.id]);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text textType="baseMediumBold" style={styles.greeting}>
        Welcome back, {user.name} 👋
      </Text>
      <Animated.View
        style={{ borderRadius: 20, marginBottom: 24, overflow: "hidden" }}
      >
        <LinearGradient
          colors={["#3b82f6", "#10b981"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.balanceCard}
        >
          <Text textType="semiRegular" style={styles.balanceLabel}>
            Wallet Balance
          </Text>
          <Text textType="headingBold" style={styles.balanceAmount}>
            ₹{user?.balance ?? 0}
          </Text>
          <Text textType="smallRegular" style={styles.lastUpdated}>
            Updated: {new Date().toLocaleDateString()}
          </Text>
        </LinearGradient>
      </Animated.View>
      <View style={styles.actionsRow}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate("AddMoney")}
        >
          <MaterialCommunityIcons
            name="wallet-plus"
            size={20}
            color="#fff"
            style={styles.actionIcon}
          />
          <Text textType="baseRegularBold" style={styles.actionText}>
            Add Money
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate("SendMoney")}
        >
          <MaterialCommunityIcons
            name="send"
            size={20}
            color="#fff"
            style={styles.actionIcon}
          />
          <Text textType="baseRegularBold" style={styles.actionText}>
            Send Money
          </Text>
        </TouchableOpacity>
      </View>
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
      {!loading &&
        transactions.slice(0, 4).map((transaction) => (
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
      {!loading && transactions.length > 4 && (
        <TouchableOpacity
          style={styles.viewAllButton}
          onPress={() => navigation.navigate("Transactions")}
        >
          <Text textType="baseRegularBold" style={styles.viewAllButtonText}>
            View All Transactions →
          </Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}
