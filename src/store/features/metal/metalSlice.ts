import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface Candle {
  date: string;
  volatility: number;
  performance: number;
  liquidity: number;
}

interface MetalsState {
  gold: Record<string, Candle>;
  silver: Record<string, Candle>;
  dollar: Record<string, Candle>;
  loading: boolean;
  error: string | null;
}

const initialState: MetalsState = {
  gold: {},
  silver: {},
  dollar: {},
  loading: false,
  error: null,
};

// Fetch placeholder data for a metal
export const fetchMetalData = createAsyncThunk(
  "metals/fetchMetalData",
  async (metal: "gold" | "silver" | "dollar") => {
    const data: Record<string, Candle> = {};
    const today = new Date();
    for (let i = 0; i < 30; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const dateStr = d.toISOString().split("T")[0];
      data[dateStr] = {
        date: dateStr,
        volatility: parseFloat((Math.random() * 5).toFixed(2)),
        performance: parseFloat((Math.random() * 10 - 5).toFixed(2)),
        liquidity: parseFloat((Math.random() * 100).toFixed(2)),
      };
    }
    return { metal, data };
  }
);

const metalsSlice = createSlice({
  name: "metals",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMetalData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMetalData.fulfilled, (state, action) => {
        state.loading = false;
        const { metal, data } = action.payload;
        state[metal] = data;
      })
      .addCase(fetchMetalData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch data";
      });
  },
});

export default metalsSlice.reducer;
