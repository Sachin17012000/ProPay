import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Transaction } from "../../../types";

interface Budget {
  period: "Daily" | "Weekly" | "Monthly";
  amount: number;
}
interface ExpensesState {
  expenses: Transaction[];
  budgets: Budget[];
}

const initialState: ExpensesState = {
  expenses: [],
  budgets: [
    { period: "Daily", amount: 1000 },
    { period: "Weekly", amount: 5000 },
    { period: "Monthly", amount: 20000 },
  ],
};

const expensesSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    addExpense(state, action: PayloadAction<Transaction>) {
      state.expenses.push(action.payload);
    },
    setBudget(
      state,
      action: PayloadAction<{
        period: "Daily" | "Weekly" | "Monthly";
        amount: number;
      }>
    ) {
      const index = state.budgets.findIndex(
        (b) => b.period === action.payload.period
      );
      if (index !== -1) {
        state.budgets[index].amount = action.payload.amount;
      } else {
        state.budgets.push(action.payload);
      }
    },
    deleteExpense: (state, action) => {
      state.expenses = state.expenses.filter(
        (expense) => expense.id !== action.payload
      );
    },
  },
});

export const { addExpense, setBudget, deleteExpense } = expensesSlice.actions;
export default expensesSlice.reducer;
