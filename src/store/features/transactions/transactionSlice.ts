import { createSlice } from "@reduxjs/toolkit";
import { createTransaction, fetchTransactionsByUser } from "./transactionThunk";
import { Transaction } from "../../../types";

interface TransactionState {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
}

const initialState: TransactionState = {
  transactions: [],
  loading: false,
  error: null,
};

const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactionsByUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactionsByUser.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload;
      })
      .addCase(fetchTransactionsByUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch transactions";
      })
      .addCase(createTransaction.fulfilled, (state, action) => {
        state.transactions.unshift(action.payload);
      })
      .addCase(createTransaction.rejected, (state, action) => {
        state.error = (action.payload as string) ?? "Unknown error";
        state.loading = false;
      });
  },
});

export default transactionSlice.reducer;
