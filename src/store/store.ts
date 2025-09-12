import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import transactionReducer from "./features/transactions/transactionSlice";
import expensesReducer from "./features/expenseTracker/expenseSlice";
import calendarReducer from "./features/calendar/calendarSlice";
import orderbookReducer from "./features/orderbook/orderbookSlice";
import candlesReducer from "./features/orderbook/candlesSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    transactions: transactionReducer,
    expenses: expensesReducer,
    calendar: calendarReducer,
    orderbook: orderbookReducer,
    candles: candlesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
