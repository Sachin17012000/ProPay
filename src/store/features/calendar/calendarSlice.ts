import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
}

const initialState: CalendarState = {
  currentMonth: new Date().getMonth(),
  currentYear: new Date().getFullYear(),
  selectedDate: null,
  daysData: {},
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
    setBulkDayData: (state, action: PayloadAction<DayData[]>) => {
      action.payload.forEach((day) => {
        state.daysData[day.date] = day;
      });
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

export const {
  setMonthYear,
  selectDate,
  setDayData,
  setBulkDayData,
  generateMockData,
} = calendarSlice.actions;
export default calendarSlice.reducer;
