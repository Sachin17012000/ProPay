import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { candleToDayData } from "../../../utils/utils";

interface DayData {
  date: string;
  volatility: number;
  liquidity: number;
  performance: number;
  price: number;
}

interface CalendarState {
  currentMonth: number;
  currentYear: number;
  selectedDate: string | null;
  daysData: Record<string, DayData>;
  timeframe: "day" | "custom";
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
    setTimeframe: (state, action: PayloadAction<"day" | "custom">) => {
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
  },
});

export const populateDaysFromCandles = createAsyncThunk(
  "calendar/populateDaysFromCandles",
  async (_, { dispatch, getState }) => {
    const candlesSlice: any = (getState() as any).candles;

    const dayDataArray = await Promise.all(
      Object.values(candlesSlice.data).map(candleToDayData)
    );

    dispatch(setBulkDayData(dayDataArray));
  }
);

export const {
  setMonthYear,
  selectDate,
  setDayData,
  setBulkDayData,
  resetSelectedDate,
  setTimeframe,
} = calendarSlice.actions;

export default calendarSlice.reducer;
