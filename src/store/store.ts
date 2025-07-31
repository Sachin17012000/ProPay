import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import transactionReducer from "./features/transactions/transactionSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    transactions: transactionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
