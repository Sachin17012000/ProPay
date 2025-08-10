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
  reducers: {
    updateTransaction: (state, action) => {
      const { id, changes } = action.payload;
      const index = state.transactions.findIndex((txn) => txn.id === id);
      if (index !== -1) {
        state.transactions[index] = {
          ...state.transactions[index],
          ...changes,
        };
      }
    },
    toggleExpenseTracking: (state, action) => {
      const id = action.payload;
      const index = state.transactions.findIndex((txn) => txn.id === id);
      if (index !== -1) {
        state.transactions[index].isTracked =
          !state.transactions[index].isTracked;
      }
    },
  },
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
export const { updateTransaction, toggleExpenseTracking } =
  transactionSlice.actions;
export default transactionSlice.reducer;
