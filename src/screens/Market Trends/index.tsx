import React, { useCallback, useEffect, useState } from "react";
import { View, TouchableOpacity, Modal } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Calendar from "../../CommonComponent/Calendar";
import styles from "./style";
import { formatCurrency, formatDate, getUsdInrRates } from "../../utils/utils";
import { useAppDispatch } from "../../hooks/hook";
import { fetchDailyCandles } from "../../store/features/orderbook/candlesSlice";
import {
  populateDaysFromCandles,
  resetSelectedDate,
  setTimeframe,
} from "../../store/features/calendar/calendarSlice";
import Text from "../../CommonComponent/Text";
import { DayData } from "../../types";
import { useFocusEffect } from "@react-navigation/native";

const MarketTrends = () => {
  const dispatch = useAppDispatch();
  const {
    selectedDate,
    daysData: btcDaysData,
    timeframe,
  } = useSelector((state: RootState) => state.calendar);

  const [modalVisible, setModalVisible] = useState(false);
  const [filter, setFilter] = useState("btc");
  const [dollarRates, setDollarRates] = useState<
    Record<string, { INR: number }>
  >({});

  useFocusEffect(
    useCallback(() => {
      dispatch(resetSelectedDate());
    }, [dispatch])
  );

  useEffect(() => {
    dispatch(fetchDailyCandles()).then(() =>
      dispatch(populateDaysFromCandles())
    );
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      const rates = await getUsdInrRates();
      setDollarRates(rates);
    })();
  }, []);

  const getDollarDaysData = (): Record<string, DayData> => {
    const result: Record<string, DayData> = {};
    Object.keys(dollarRates).forEach((dateStr) => {
      const inr = dollarRates[dateStr].INR;
      result[dateStr] = {
        date: dateStr,
        volatility: 0, // Not applicable for USD, set 0
        performance: 0, // Not applicable for USD
        liquidity: 0, // Not applicable for USD
        price: inr, // INR value directly
      };
    });
    return result;
  };
  const getDayData = (): DayData | null => {
    if (!selectedDate) return null;
    if (filter === "btc") return btcDaysData[selectedDate] || null;
    if (filter === "usd") {
      const usdData = getDollarDaysData();
      return usdData[selectedDate] || null;
    }
    return null;
  };
  const getDaysData = (): Record<string, DayData> => {
    if (filter === "btc") {
      if (timeframe === "day") return btcDaysData;

      const aggregated: Record<string, DayData> = {};
      Object.keys(btcDaysData).forEach((dateStr) => {
        const date = new Date(dateStr);
        let key = dateStr;

        if (timeframe === "week") {
          const weekNum = Math.ceil((date.getDate() - date.getDay() + 1) / 7);
          key = `${date.getFullYear()}-W${weekNum}`;
        } else if (timeframe === "month") {
          key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
            2,
            "0"
          )}`;
        }

        if (!aggregated[key]) aggregated[key] = { ...btcDaysData[dateStr] };
        else {
          aggregated[key].volatility += btcDaysData[dateStr].volatility;
          aggregated[key].performance += btcDaysData[dateStr].performance;
          aggregated[key].liquidity += btcDaysData[dateStr].liquidity;
        }
      });

      Object.keys(aggregated).forEach((key) => {
        if (timeframe === "week" || timeframe === "month") {
          const count =
            Object.keys(btcDaysData).filter((d) =>
              d.startsWith(key.split("-W")[0])
            ).length || 1;
          aggregated[key].volatility /= count;
          aggregated[key].performance /= count;
          aggregated[key].liquidity /= count;
        }
      });

      return aggregated;
    }

    if (filter === "usd") return getDollarDaysData();

    return {};
  };

  const dayData = getDayData();
  const daysData = getDaysData();
  const renderFilterButton = (type: "btc" | "usd", label: string) => (
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
        BTC Market Seasonality Explorer
      </Text>
      <View style={styles.filterContainer}>
        {renderFilterButton("btc", "Bitcoin")}
        {renderFilterButton("usd", "Dollar")}
      </View>
      <View style={styles.timeframeContainer}>
        {["day", "week", "month"].map((tf) => (
          <TouchableOpacity
            key={tf}
            style={[
              styles.timeframeBtn,
              tf === timeframe && styles.activeTimeframeBtn,
            ]}
            onPress={() =>
              dispatch(setTimeframe(tf as "day" | "week" | "month"))
            }
          >
            <Text>{tf.toUpperCase()}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Calendar
        onDatePress={() => setModalVisible(true)}
        daysData={daysData}
        timeframe={timeframe}
      />

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {dayData ? (
              <>
                <Text textType="mediumBold" style={styles.modalTitle}>
                  📅 {formatDate(selectedDate)} (
                  {filter === "btc" ? "BTC" : "Dollar"})
                </Text>
                {filter === "btc" ? (
                  <>
                    <Text textType="baseRegular" style={styles.detailText}>
                      Volatility: {dayData.volatility.toFixed(2)}%
                    </Text>
                    <Text textType="baseRegular" style={styles.detailText}>
                      Liquidity: {dayData.liquidity.toFixed(2)}
                    </Text>
                    <Text textType="baseRegular" style={styles.detailText}>
                      Performance: {dayData.performance >= 0 ? "+" : ""}
                      {dayData.performance.toFixed(2)}%
                    </Text>
                    <Text textType="baseRegular" style={styles.detailText}>
                      Price: {formatCurrency(dayData.price)}
                    </Text>
                  </>
                ) : (
                  <Text textType="baseRegular" style={styles.detailText}>
                    Price: {formatCurrency(dayData.price, 2)}
                  </Text>
                )}
              </>
            ) : (
              <Text textType="baseRegular" style={styles.detailText}>
                No BTC data available yet
              </Text>
            )}

            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeBtnText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default MarketTrends;
