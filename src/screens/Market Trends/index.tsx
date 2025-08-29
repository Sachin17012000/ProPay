import React, { useCallback, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
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
} from "../../store/features/calendar/calendarSlice";
import { useFocusEffect } from "@react-navigation/native";

const MarketTrends = () => {
  const dispatch = useAppDispatch();
  const { selectedDate, daysData } = useSelector(
    (state: RootState) => state.calendar
  );
  const [modalVisible, setModalVisible] = useState(false);
  const dayData = selectedDate ? daysData[selectedDate] : null;

  useFocusEffect(
    useCallback(() => {
      dispatch(resetSelectedDate());
    }, [dispatch])
  );
  useEffect(() => {
    dispatch(fetchDailyCandles()).then(() => {
      dispatch(populateDaysFromCandles());
    });
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Market Seasonality Explorer</Text>
      <Calendar onDatePress={() => setModalVisible(true)} />
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {dayData ? (
              <>
                <Text style={styles.modalTitle}>
                  📅 {formatDate(selectedDate)}
                </Text>
                <Text style={styles.detailText}>
                  Volatility: {dayData.volatility}%
                </Text>
                <Text style={styles.detailText}>
                  Liquidity: {dayData.liquidity}
                </Text>
                <Text style={styles.detailText}>
                  Performance: {dayData.performance >= 0 ? "+" : ""}
                  {dayData.performance}%
                </Text>
              </>
            ) : (
              <Text style={styles.detailText}>No data available</Text>
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
