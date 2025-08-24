import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface OrderbookState {
  bestBid: number | null;
  bestAsk: number | null;
  lastUpdated: string | null;
}

const initialState: OrderbookState = {
  bestBid: null,
  bestAsk: null,
  lastUpdated: null,
};

const orderbookSlice = createSlice({
  name: "orderbook",
  initialState,
  reducers: {
    updateOrderbook: (
      state,
      action: PayloadAction<{ bestBid: number; bestAsk: number }>
    ) => {
      state.bestBid = action.payload.bestBid;
      state.bestAsk = action.payload.bestAsk;
      state.lastUpdated = new Date().toISOString();
    },
    resetOrderbook: (state) => {
      state.bestBid = null;
      state.bestAsk = null;
      state.lastUpdated = null;
    },
  },
});

export const { updateOrderbook, resetOrderbook } = orderbookSlice.actions;
export default orderbookSlice.reducer;
