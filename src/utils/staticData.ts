export const categories = [
  "Food",
  "Travel",
  "Shopping",
  "Rent",
  "Bills",
  "Entertainment",
  "Health",
  "Others",
];
export const toggleArray = [
  { title: "Daily" },
  { title: "Weekly" },
  { title: "Monthly" },
];
export const budgetArray = ["Daily", "Weekly", "Monthly"] as const;
export const instruments = ["Crypto", "Gold", "Silver", "USD"];
export const transactionFilters = [
  {
    title: "All",
    type: "all",
  },
  {
    title: "Sent",
    type: "send",
  },
  {
    title: "Added",
    type: "add",
  },
];
export const marketTrendsFilter = [
  {
    title: "Bitcoin",
    type: "btc",
  },
  {
    title: "Dollar",
    type: "usd",
  },
];
