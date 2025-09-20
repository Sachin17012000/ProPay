import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Text from "../Text";
import { formatDate } from "../../utils/utils";
import colors from "../Theme/Color";

interface CustomRange {
  start: string | null;
  end: string | null;
}

interface Props {
  range: CustomRange;
  setRange: (range: CustomRange) => void;
  onShowData: () => void;
  error: string | null;
  setError: (msg: string | null) => void;
  validateDate?: (date: Date, type: "start" | "end") => boolean;
}

const CustomRangePicker = ({
  range,
  setRange,
  onShowData,
  error,
  setError,
  validateDate,
}: Props) => {
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const handleDateChange = (
    event: any,
    selectedDate: Date | undefined,
    type: "start" | "end"
  ) => {
    type === "start" ? setShowStartPicker(false) : setShowEndPicker(false);
    if (!selectedDate) return;

    if (validateDate && !validateDate(selectedDate, type)) return;

    const dateStr = selectedDate.toISOString().split("T")[0];
    type === "start"
      ? setRange({ ...range, start: dateStr })
      : setRange({ ...range, end: dateStr });
    setError(null);
  };

  return (
    <View style={styles.container}>
      <Text textType="mediumBold" style={styles.title}>
        Select Custom Range
      </Text>

      <TouchableOpacity
        style={styles.dateBtn}
        onPress={() => {
          setError(null);
          setShowStartPicker(true);
        }}
      >
        <Text>
          {range.start
            ? `Start: ${formatDate(range.start)}`
            : "Select Start Date"}
        </Text>
      </TouchableOpacity>
      {showStartPicker && (
        <DateTimePicker
          value={range.start ? new Date(range.start) : new Date()}
          mode="date"
          display="default"
          onChange={(e, d) => handleDateChange(e, d, "start")}
        />
      )}

      <TouchableOpacity
        style={styles.dateBtn}
        onPress={() => {
          setError(null);
          setShowEndPicker(true);
        }}
      >
        <Text>
          {range.end ? `End: ${formatDate(range.end)}` : "Select End Date"}
        </Text>
      </TouchableOpacity>
      {showEndPicker && (
        <DateTimePicker
          value={range.end ? new Date(range.end) : new Date()}
          mode="date"
          display="default"
          onChange={(e, d) => handleDateChange(e, d, "end")}
        />
      )}

      {range.start && range.end && (
        <TouchableOpacity style={styles.showBtn} onPress={onShowData}>
          <Text textType="baseRegularBold" style={styles.showBtnText}>
            Show Data
          </Text>
        </TouchableOpacity>
      )}

      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

export default CustomRangePicker;

const styles = StyleSheet.create({
  container: { padding: 10 },
  title: { marginBottom: 5 },
  dateBtn: {
    padding: 10,
    borderWidth: 1,
    marginBottom: 8,
    backgroundColor: colors.greyish,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: colors.lightShadowBlack,
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  showBtn: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: colors.blue,
    alignItems: "center",
    marginTop: 10,
  },
  showBtnText: {
    color: colors.ivory,
  },
  error: { color: colors.crimson, marginTop: 6, textAlign: "center" },
});
