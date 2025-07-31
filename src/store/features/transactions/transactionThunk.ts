import { createAsyncThunk } from "@reduxjs/toolkit";
import transactionsData from "../../../transactionData.json";
import { Transaction } from "../../../types";
import { getSavedTransactions, saveTransaction } from "../../../utils/storage";

export const fetchTransactionsByUser = createAsyncThunk<Transaction[], string>(
  "transactions/fetchByUser",
  async (userId) => {
    await new Promise((res) => setTimeout(res, 500));
    const fromJson = (transactionsData as Transaction[]).filter(
      (txn) => txn.userId === userId
    );
    const fromStorage = (await getSavedTransactions()).filter(
      (txn) => txn.userId === userId
    );
    return [...fromStorage, ...fromJson];
  }
);
export const createTransaction = createAsyncThunk<Transaction, Transaction>(
  "transactions/create",
  async (txn, { rejectWithValue }) => {
    try {
      await saveTransaction(txn);
      return txn;
    } catch (error: any) {
      return rejectWithValue("Failed to save transaction.");
    }
  }
);
