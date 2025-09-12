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
  timeframe?: "day" | "week" | "month";
}

const Calendar = ({
  onDatePress,
  daysData = {},
  timeframe = "day",
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

          const dateStr = date.toISOString().split("T")[0];
          const dayData = daysData[dateStr];

          const isToday =
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear();
          const isSelected = selectedDate === dateStr;

          return (
            <TouchableOpacity
              key={idx}
              style={[
                styles.dayCell,
                dayData && {
                  backgroundColor: getVolatilityColor(dayData.volatility),
                },
                isToday && styles.todayCell,
                isSelected && styles.selectedCell,
                !dayData && { opacity: 0.3 },
              ]}
              onPress={() => dayData && handleSelectKey(dateStr)}
            >
              <Text textType="semiRegular">{date.getDate()}</Text>
              {dayData && (
                <View
                  style={{
                    width: Math.min(20, dayData.liquidity / 50 + 5),
                    height: Math.min(20, dayData.liquidity / 50 + 5),
                    borderRadius: 50,
                    backgroundColor: "rgba(0,0,0,0.4)",
                    marginTop: 2,
                  }}
                />
              )}
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

  const renderAggregatedView = (unit: "week" | "month") => {
    const keys = Object.keys(daysData)
      .filter((k) =>
        unit === "week" ? k.includes("W") : /^\d{4}-\d{2}$/.test(k)
      )
      .sort();

    return (
      <View style={styles.gridWeekMonth}>
        {keys.map((key) => {
          const data = daysData[key];
          const isSelected = selectedDate === key;
          let label = key;
          if (unit === "month") {
            const [year, month] = key.split("-");
            const date = new Date(Number(year), Number(month) - 1, 1);
            label = date.toLocaleString("default", {
              month: "short",
              year: "numeric",
            });
          } else if (unit === "week") label = `W${key.split("-W")[1]}`;

          return (
            <TouchableOpacity
              key={key}
              style={[
                styles.weekMonthCell,
                { backgroundColor: getVolatilityColor(data.volatility) },
                isSelected && styles.selectedCell,
              ]}
              onPress={() => handleSelectKey(key)}
            >
              <Text textType="semiRegular">{label}</Text>
              <Text style={{ fontSize: 12 }}>
                {data.performance >= 0 ? "↑" : "↓"}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

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

      {timeframe === "day" && renderDayView()}
      {timeframe === "week" && renderAggregatedView("week")}
      {timeframe === "month" && renderAggregatedView("month")}
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
  gridWeekMonth: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  dayCell: {
    width: "14.28%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: colors.lightGray,
  },
  weekMonthCell: {
    width: "30%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: "1.5%",
    borderWidth: 0.5,
    borderColor: colors.lightGray,
  },
  todayCell: { backgroundColor: colors.mint },
  selectedCell: { borderWidth: 2, borderColor: colors.greyMint },
});
