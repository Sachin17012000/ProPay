import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Text from "../Text";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import {
  selectDate,
  setMonthYear,
} from "../../store/features/calendar/calendarSlice";
import colors from "../Theme/Color";
import { useAppDispatch } from "../../hooks/hook";
import { getVolatilityColor } from "../../utils/utils";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface CalendarProps {
  onDatePress?: () => void;
  daysData?: Record<
    string,
    { volatility: number; performance: number; liquidity: number }
  >;
  filter?: "btc" | "usd";
}

const Calendar = ({
  onDatePress,
  daysData = {},
  filter = "btc",
}: CalendarProps) => {
  const dispatch = useAppDispatch();
  const { currentMonth, currentYear, selectedDate } = useSelector(
    (state: RootState) => state.calendar
  );

  const today = new Date();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);

  const daysInMonth = lastDayOfMonth.getDate();
  const startDay = firstDayOfMonth.getDay();

  const calendarDays: (Date | null)[] = [];
  for (let i = 0; i < startDay; i++) calendarDays.push(null);
  for (let d = 1; d <= daysInMonth; d++)
    calendarDays.push(new Date(currentYear, currentMonth, d));

  const handlePrevMonth = () => {
    const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    dispatch(setMonthYear({ month: prevMonth, year: prevYear }));
  };

  const handleNextMonth = () => {
    const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
    const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;
    dispatch(setMonthYear({ month: nextMonth, year: nextYear }));
  };

  const handleSelectKey = (key: string) => {
    dispatch(selectDate(key));
    onDatePress?.();
  };

  const renderDayView = () => (
    <>
      <View style={styles.weekRow}>
        {daysOfWeek.map((day) => (
          <Text key={day} style={styles.weekDay}>
            {day}
          </Text>
        ))}
      </View>
      <View style={styles.grid}>
        {calendarDays.map((date, idx) => {
          if (!date) return <View key={idx} style={styles.dayCell} />;

          const dateStr = `${date.getFullYear()}-${String(
            date.getMonth() + 1
          ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

          const dayData = daysData[dateStr];
          const isToday =
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear();
          const isSelected = selectedDate === dateStr;

          let bgColor = undefined;
          if (dayData) {
            if (filter === "usd") {
              bgColor =
                dayData.performance >= 0 ? colors.green : colors.crimson;
            } else {
              bgColor = getVolatilityColor(dayData.volatility);
            }
          }

          return (
            <TouchableOpacity
              key={idx}
              style={[
                styles.dayCell,
                dayData && { backgroundColor: bgColor },
                isToday && styles.todayCell,
                isSelected && styles.selectedCell,
                !dayData && { opacity: 0.3 },
              ]}
              onPress={() => dayData && handleSelectKey(dateStr)}
            >
              <Text textType="semiRegular">{date.getDate()}</Text>
              {dayData && (
                <Text style={{ fontSize: 12 }}>
                  {dayData.performance >= 0 ? "↑" : "↓"}
                </Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handlePrevMonth}>
          <Text textType="baseMedium" style={styles.navBtn}>
            {"<"}
          </Text>
        </TouchableOpacity>
        <Text textType="mediumBold">
          {firstDayOfMonth.toLocaleString("default", { month: "long" })}{" "}
          {currentYear}
        </Text>
        <TouchableOpacity onPress={handleNextMonth}>
          <Text textType="baseMedium" style={styles.navBtn}>
            {">"}
          </Text>
        </TouchableOpacity>
      </View>

      {renderDayView()}
    </View>
  );
};

export default Calendar;

const styles = StyleSheet.create({
  container: { padding: 10 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  navBtn: { paddingHorizontal: 10 },
  weekRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 5,
  },
  weekDay: { width: 40, textAlign: "center", fontWeight: "bold" },
  grid: { flexDirection: "row", flexWrap: "wrap" },
  dayCell: {
    width: "14.28%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: colors.lightGray,
  },
  customCell: {
    width: "95%",
    aspectRatio: 3,
    justifyContent: "center",
    alignItems: "center",
    margin: "2.5%",
    borderWidth: 0.5,
    borderColor: colors.lightGray,
  },
  todayCell: { backgroundColor: colors.mint },
  selectedCell: { borderWidth: 2, borderColor: colors.greyMint },
});
