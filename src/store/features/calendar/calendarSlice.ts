import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { candleToDayData } from "../../../utils/utils";

interface DayData {
  date: string;
  volatility: number;
  liquidity: number;
  performance: number;
}

interface CalendarState {
  currentMonth: number;
  currentYear: number;
  selectedDate: string | null;
  daysData: Record<string, DayData>;
  timeframe: "day" | "week" | "month";
}

const initialState: CalendarState = {
  currentMonth: new Date().getMonth(),
  currentYear: new Date().getFullYear(),
  selectedDate: null,
  daysData: {},
  timeframe: "day",
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    setMonthYear: (
      state,
      action: PayloadAction<{ month: number; year: number }>
    ) => {
      state.currentMonth = action.payload.month;
      state.currentYear = action.payload.year;
    },
    selectDate: (state, action: PayloadAction<string>) => {
      state.selectedDate = action.payload;
    },
    setDayData: (state, action: PayloadAction<DayData>) => {
      state.daysData[action.payload.date] = action.payload;
    },
    setTimeframe: (state, action: PayloadAction<"day" | "week" | "month">) => {
      state.timeframe = action.payload;
    },
    setBulkDayData: (state, action: PayloadAction<DayData[]>) => {
      action.payload.forEach((day) => {
        state.daysData[day.date] = day;
      });
    },
    resetSelectedDate: (state) => {
      state.selectedDate = null;
    },
    generateMockData: (state) => {
      const daysInMonth = new Date(
        state.currentYear,
        state.currentMonth + 1,
        0
      ).getDate();
      const mock: DayData[] = [];
      for (let d = 1; d <= daysInMonth; d++) {
        const dateStr = new Date(state.currentYear, state.currentMonth, d)
          .toISOString()
          .split("T")[0];
        mock.push({
          date: dateStr,
          volatility: Math.floor(Math.random() * 100),
          liquidity: Math.floor(Math.random() * 1000),
          performance: Math.floor(Math.random() * 21) - 10,
        });
      }
      state.daysData = {};
      mock.forEach((day) => (state.daysData[day.date] = day));
    },
  },
});

export const populateDaysFromCandles = createAsyncThunk(
  "calendar/populateDaysFromCandles",
  async (_, { dispatch, getState }) => {
    const candlesSlice: any = (getState() as any).candles;
    const dayDataArray = Object.values(candlesSlice.data).map(candleToDayData);
    dispatch(setBulkDayData(dayDataArray));
  }
);

export const {
  setMonthYear,
  selectDate,
  setDayData,
  setBulkDayData,
  generateMockData,
  resetSelectedDate,
  setTimeframe,
} = calendarSlice.actions;
export default calendarSlice.reducer;
