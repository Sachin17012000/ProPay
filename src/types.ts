export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  AddMoney: undefined;
  SendMoney: undefined;
  Transactions: undefined;
  Profile: undefined;
  ForgotPassword: undefined;
  ExpenseTracker: undefined;
  MarketTrends: undefined;
};
export type Transaction = {
  id: string;
  type: "send" | "add";
  amount: number;
  to?: string;
  from?: string;
  date: string;
  note?: string;
  userId: string;
  isTracked?: boolean;
  category?: string;
};
export interface User {
  id: string;
  name: string;
  email: string;
  token: string;
  balance: number;
}
export interface UserWithPassword extends User {
  password: string;
}
export type RegisterFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};
export interface DayData {
  date: string;
  volatility: number;
  liquidity: number;
  performance: number;
  price: number;
}
