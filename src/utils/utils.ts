import { Transaction, User } from "../types";

const allowedUserIds = [
  "user001",
  "user002",
  "user003",
  "user004",
  "user005",
  "user006",
  "user007",
  "user008",
];

export const randomId = () =>
  allowedUserIds[Math.floor(Math.random() * allowedUserIds.length)];

export const getInitials = (user: User) => {
  const name = user?.name?.trim() || "";
  const words = name.split(" ");
  const initials =
    words.length >= 2
      ? words[0][0].toUpperCase() + words[1][0].toUpperCase()
      : words[0]?.[0]?.toUpperCase() || "?";
  return initials;
};

export const getCategoryIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case "food":
      return "food";
    case "travel":
      return "car";
    case "shopping":
      return "cart";
    case "rent":
      return "home";
    case "bills":
      return "file-document";
    case "entertainment":
      return "movie";
    case "health":
      return "heart-pulse";
    default:
      return "dots-horizontal";
  }
};

export const normalizeDate = (date: Date) => {
  date.setHours(0, 0, 0, 0);
  return date;
};
export const getDateFilteredExpenses = (
  allExpenses: Transaction[],
  activeTab: string
) => {
  const now = new Date();
  return allExpenses.filter((txn) => {
    const txnDate = normalizeDate(new Date(txn.date));
    if (activeTab === "Daily") {
      return (
        txnDate.getDate() === now.getDate() &&
        txnDate.getMonth() === now.getMonth() &&
        txnDate.getFullYear() === now.getFullYear()
      );
    }
    if (activeTab === "Weekly") {
      const startOfWeek = normalizeDate(new Date(now));
      startOfWeek.setDate(now.getDate() - now.getDay());
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      return txnDate >= startOfWeek && txnDate <= endOfWeek;
    }
    return (
      txnDate.getMonth() === now.getMonth() &&
      txnDate.getFullYear() === now.getFullYear()
    );
  });
};
export const getToggleTitle = (activeTab: string) => {
  if (activeTab === "Daily") return "Day";
  if (activeTab === "Weekly") return "Week";
  return "Month";
};
export const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

export const formatDate = (dateString: string) =>
  new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(dateString));
