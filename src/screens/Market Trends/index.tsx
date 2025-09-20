import React, { useCallback, useEffect, useState } from "react";
import { View, TouchableOpacity, Modal } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Calendar from "../../CommonComponent/Calendar";
import styles from "./style";
import {
  buildCustomRangeData,
  formatCurrency,
  formatDate,
  getUsdInrRates,
} from "../../utils/utils";
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
import FilterButtons from "../../CommonComponent/filterButtons";
import { marketTrendsFilter } from "../../utils/staticData";
import CustomRangePicker from "../../CommonComponent/CustomRangePicker";

const MarketTrends = () => {
  const dispatch = useAppDispatch();
  const {
    selectedDate,
    daysData: btcDaysData,
    timeframe,
  } = useSelector((state: RootState) => state.calendar);

  const [modalVisible, setModalVisible] = useState(false);
  const [filter, setFilter] = useState<"btc" | "usd">("btc");
  const [customData, setCustomData] = useState<DayData | null>(null);
  const [dollarRates, setDollarRates] = useState<
    Record<string, { INR: number }>
  >({});
  const [customRange, setCustomRange] = useState<{
    start: string | null;
    end: string | null;
  }>({ start: null, end: null });
  const [error, setError] = useState("");

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
    const dates = Object.keys(dollarRates).sort();

    for (let i = 0; i < dates.length; i++) {
      const dateStr = dates[i];
      const todayPrice = dollarRates[dateStr].INR;

      const prevPrice = i > 0 ? dollarRates[dates[i - 1]].INR : todayPrice;
      const performance = ((todayPrice - prevPrice) / prevPrice) * 100;

      result[dateStr] = {
        date: dateStr,
        volatility: 0,
        liquidity: 0,
        price: todayPrice,
        performance: Number(performance.toFixed(2)),
      };
    }

    return result;
  };

  const getDayData = (): DayData | null => {
    if (timeframe === "day") {
      if (!selectedDate) return null;
      if (filter === "btc") return btcDaysData[selectedDate] || null;
      if (filter === "usd") {
        const usdData = getDollarDaysData();
        return usdData[selectedDate] || null;
      }
    }

    if (timeframe === "custom") {
    }

    return null;
  };

  const getDaysData = (): Record<string, DayData> => {
    if (filter === "btc") return btcDaysData;
    if (filter === "usd") return getDollarDaysData();
    return {};
  };

  const dayData = getDayData();
  const daysData = getDaysData();
  const renderDayData = (dayData: DayData, filter: "btc" | "usd") => (
    <>
      <Text textType="mediumBold" style={styles.modalTitle}>
        📅 {formatDate(dayData.date)} ({filter === "btc" ? "BTC" : "Dollar"})
      </Text>
      {filter === "btc" ? (
        <>
          <Text style={styles.detailText}>
            Volatility: {dayData.volatility.toFixed(2)}%
          </Text>
          <Text style={styles.detailText}>
            Liquidity: {dayData.liquidity.toFixed(2)}
          </Text>
          <Text style={styles.detailText}>
            Performance: {dayData.performance >= 0 ? "+" : ""}
            {dayData.performance.toFixed(2)}%
          </Text>
          <Text style={styles.detailText}>
            Price: {formatCurrency(dayData.price)}
          </Text>
        </>
      ) : (
        <>
          <Text style={styles.detailText}>
            Price: {formatCurrency(dayData.price, 2)}
          </Text>
          <Text style={styles.detailText}>
            Performance: {dayData.performance >= 0 ? "+" : ""}
            {dayData.performance.toFixed(2)}%
          </Text>
        </>
      )}
    </>
  );

  const renderCustomData = (customData: DayData, filter: "btc" | "usd") => (
    <>
      <Text textType="mediumBold" style={styles.modalTitle}>
        📊 {customData.date} ({filter === "btc" ? "BTC" : "Dollar"})
      </Text>
      <Text style={styles.detailText}>
        Start Price: {formatCurrency(customData.start_price, 2)}
      </Text>
      <Text style={styles.detailText}>
        End Price: {formatCurrency(customData.price, 2)}
      </Text>
      <Text style={styles.detailText}>
        Performance: {customData.performance >= 0 ? "+" : ""}
        {customData.performance.toFixed(2)}%
      </Text>
    </>
  );

  return (
    <View style={styles.container}>
      <Text textType="headingBold" style={styles.title}>
        Market Seasonality Explorer
      </Text>
      <FilterButtons
        buttonArray={marketTrendsFilter}
        filter={filter}
        setFilter={setFilter}
        resetCustomRange={() => {
          setCustomRange({ start: null, end: null });
          setCustomData(null);
          setError("");
        }}
      />
      <View style={styles.timeframeContainer}>
        {["day", "custom"].map((tf) => (
          <TouchableOpacity
            key={tf}
            style={[
              styles.timeframeBtn,
              tf === timeframe && styles.activeTimeframeBtn,
            ]}
            onPress={() => dispatch(setTimeframe(tf as "day" | "custom"))}
          >
            <Text>{tf.toUpperCase()}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {timeframe === "day" && (
        <Calendar
          onDatePress={() => {
            setModalVisible(true);
          }}
          daysData={daysData}
          filter={filter}
        />
      )}
      {timeframe === "custom" && (
        <CustomRangePicker
          range={customRange}
          setRange={setCustomRange}
          error={error}
          setError={setError}
          onShowData={() => {
            setError(null);
            const startDate = new Date(customRange.start!);
            const endDate = new Date(customRange.end!);

            if (endDate < startDate) {
              setError("End date cannot be earlier than Start date.");
              return;
            }
            if (startDate.getTime() === endDate.getTime()) {
              setError("Start date and End date cannot be the same.");
              return;
            }

            const sourceData =
              filter === "btc" ? btcDaysData : getDollarDaysData();

            const data = buildCustomRangeData(
              customRange.start!,
              customRange.end!,
              sourceData
            );

            setCustomData(data);
            setModalVisible(true);
          }}
          validateDate={(date) => {
            const day = date.getDay();
            if (filter === "usd" && (day === 0 || day === 6)) {
              setError("Weekends are not allowed for Dollar filter");
              return false;
            }
            return true;
          }}
        />
      )}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {timeframe === "day" ? (
              dayData ? (
                renderDayData(dayData, filter)
              ) : (
                <Text>No data available</Text>
              )
            ) : customData ? (
              renderCustomData(customData, filter)
            ) : (
              <Text>No custom range data available</Text>
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
