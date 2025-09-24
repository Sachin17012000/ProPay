import { Animated, RefreshControl } from "react-native";
import { useEffect, useRef, useState, useCallback } from "react";
import { View, ScrollView } from "react-native";
import Text from "../../CommonComponent/Text";
import styles from "./style";
import { useAppNavigation } from "../../hooks/useAppNavigation";
import { LinearGradient } from "expo-linear-gradient";
import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import { fetchTransactionsByUser } from "../../store/features/transactions/transactionThunk";
import { FeatureButton } from "../../CommonComponent/FeatureButton";
import colors from "../../CommonComponent/Theme/Color";
import { formatCurrency, formatDate } from "../../utils/utils";
import HomeScreenTransactions from "../../CommonComponent/HomeScreenTransactions";

export default function HomeScreen() {
  const dispatch = useAppDispatch();
  const navigation = useAppNavigation();

  const user = useAppSelector((state) => state.user.user);
  const transactions = useAppSelector(
    (state) => state.transactions.transactions
  );
  const loading = useAppSelector((state) => state.transactions.loading);
  const error = useAppSelector((state) => state.transactions.error);

  const [refreshing, setRefreshing] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchTransactionsByUser(user.id));
    }
  }, [dispatch, user?.id]);

  const runBalanceAnimation = () => {
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    runBalanceAnimation();
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    runBalanceAnimation();
    if (user?.id) {
      await dispatch(fetchTransactionsByUser(user.id));
    }
    setRefreshing(false);
  }, [dispatch, user?.id]);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Text
        textType="baseMediumBold"
        style={styles.greeting}
        accessibilityLabel={`Welcome back, ${user.name}`}
      >
        Welcome back, {user.name} 👋
      </Text>
      <Animated.View
        style={[
          styles.balanceAnimationStyle,
          {
            opacity: fadeAnim,
            transform: [
              {
                translateY: fadeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [30, 0],
                }),
              },
            ],
          },
        ]}
        accessible
      >
        <LinearGradient
          colors={[colors.steelBlue, colors.emerald]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.balanceCard}
        >
          <Text textType="semiRegular" style={styles.balanceLabel}>
            Wallet Balance
          </Text>
          <Text textType="headingBold" style={styles.balanceAmount}>
            {formatCurrency(user?.balance ?? 0)}
          </Text>
          <Text textType="smallRegular" style={styles.lastUpdated}>
            Updated: {formatDate(new Date().toISOString())}
          </Text>
        </LinearGradient>
      </Animated.View>
      <View style={styles.featureGrid}>
        <FeatureButton
          icon="wallet-plus"
          label="Add Money"
          onPress={() => navigation.navigate("AddMoney")}
          color={colors.emerald}
        />
        <FeatureButton
          icon="send"
          label="Send Money"
          onPress={() => navigation.navigate("SendMoney")}
          color={colors.steelBlue}
        />
        <FeatureButton
          icon="chart-line"
          label="Expense Tracker"
          onPress={() => {
            navigation.navigate("ExpenseTracker");
          }}
          color={colors.orange}
        />
        <FeatureButton
          icon="bank"
          label="Market"
          onPress={() => {
            navigation.navigate("MarketTrends");
          }}
          color={colors.purple}
        />
      </View>
      <HomeScreenTransactions
        loading={loading}
        transactions={transactions}
        error={error}
      />
    </ScrollView>
  );
}
