import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface Candle {
  openTime: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

interface CandlesState {
  data: Record<string, Candle>;
  loading: boolean;
  error: string | null;
}

const initialState: CandlesState = {
  data: {},
  loading: false,
  error: null,
};

export const fetchDailyCandles = createAsyncThunk(
  "candles/fetchDailyCandles",
  async () => {
    const response = await axios.get(
      "https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1d&limit=100"
    );
    return response.data.map((candle: any) => {
      return {
        openTime: candle[0],
        open: parseFloat(candle[1]),
        high: parseFloat(candle[2]),
        low: parseFloat(candle[3]),
        close: parseFloat(candle[4]),
        volume: parseFloat(candle[5]),
      };
    });
  }
);

const candlesSlice = createSlice({
  name: "candles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDailyCandles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDailyCandles.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        const data: Record<string, Candle> = {};
        action.payload.forEach((candle: Candle) => {
          const date = new Date(candle.openTime).toISOString().split("T")[0];
          data[date] = candle;
        });
        state.data = data;
      })
      .addCase(fetchDailyCandles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch candles";
      });
  },
});

export default candlesSlice.reducer;
