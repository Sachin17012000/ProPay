import React, { useCallback, useEffect, useState } from "react";
import { View, TouchableOpacity, Modal } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Calendar from "../../CommonComponent/Calendar";
import styles from "./style";
import { formatDate } from "../../utils/utils";
import { useAppDispatch } from "../../hooks/hook";
import { fetchDailyCandles } from "../../store/features/orderbook/candlesSlice";
import {
  populateDaysFromCandles,
  resetSelectedDate,
  setTimeframe,
} from "../../store/features/calendar/calendarSlice";
import { useFocusEffect } from "@react-navigation/native";
import Text from "../../CommonComponent/Text";
import { fetchMetalData } from "../../store/features/metal/metalSlice";
import { DayData } from "../../types";

const filters = ["btc", "gold", "silver", "dollar"];

const MarketTrends = () => {
  const dispatch = useAppDispatch();
  const {
    selectedDate,
    daysData: btcDaysData,
    timeframe,
  } = useSelector((state: RootState) => state.calendar);

  const metalsData = useSelector((state: RootState) => state.metals);

  const [modalVisible, setModalVisible] = useState(false);
  const [filter, setFilter] = useState("btc");

  useFocusEffect(
    useCallback(() => {
      dispatch(resetSelectedDate());
    }, [dispatch])
  );

  useEffect(() => {
    if (filter === "btc") {
      dispatch(fetchDailyCandles()).then(() => {
        dispatch(populateDaysFromCandles());
      });
    } else if (["gold", "silver", "dollar"].includes(filter)) {
      dispatch(fetchMetalData(filter as "gold" | "silver" | "dollar"));
    }
  }, [dispatch, filter]);

  const getDayData = () => {
    if (!selectedDate) return null;
    if (filter === "btc") return btcDaysData[selectedDate];
    return metalsData?.[filter]?.[selectedDate] || null;
  };

  const getDaysData = () => {
    const data = filter === "btc" ? btcDaysData : metalsData?.[filter] || {};

    if (timeframe === "day") return data;

    const aggregated: Record<string, DayData> = {};
    Object.keys(data).forEach((dateStr) => {
      const date = new Date(dateStr);
      let key = dateStr;

      if (timeframe === "week") {
        const weekNum = Math.ceil((date.getDate() - date.getDay() + 1) / 7);
        key = `${date.getFullYear()}-W${weekNum}`;
      } else if (timeframe === "month") {
        key = `${date.getFullYear()}-${(date.getMonth() + 1)
          .toString()
          .padStart(2, "0")}`;
      }

      if (!aggregated[key]) aggregated[key] = { ...data[dateStr] };
      else {
        aggregated[key].volatility += data[dateStr].volatility;
        aggregated[key].liquidity += data[dateStr].liquidity;
        aggregated[key].performance += data[dateStr].performance;
      }
    });

    return aggregated;
  };

  const dayData = getDayData();

  return (
    <View style={styles.container}>
      <Text textType="headingBold" style={styles.title}>
        Market Seasonality Explorer
      </Text>

      <View style={styles.filterContainer}>
        {filters.map((f) => (
          <TouchableOpacity
            key={f}
            style={[
              styles.filterButton,
              filter === f && styles.activeFilterButton,
            ]}
            onPress={() => setFilter(f)}
          >
            <Text
              textType="baseRegular"
              style={[
                styles.filterButtonText,
                filter === f && styles.activeFilterButtonText,
              ]}
            >
              {f.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
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
        daysData={getDaysData()}
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
                  📅 {formatDate(selectedDate)} ({filter.toUpperCase()})
                </Text>
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
              </>
            ) : (
              <Text textType="baseRegular" style={styles.detailText}>
                No data available for {filter.toUpperCase()} yet
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
