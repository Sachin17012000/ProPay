export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  AddMoney: undefined;
  SendMoney: undefined;
  Transactions: undefined;
  Profile: undefined;
};
export type Transaction = {
  id: string;
  type: "send" | "add";
  amount: number;
  to?: string;
  from?: string;
  date: string;
  note?: string;
};
