import colors from "../CommonComponent/Theme/Color";
import { DayData, Transaction, User } from "../types";

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
export const formatCurrency = (amount: number, decimal?: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: decimal ? decimal : 0,
  }).format(amount);

export const formatDate = (dateString: string) =>
  new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(dateString));
export const getVolatilityColor = (volatility: number) => {
  if (volatility < 1.5) return colors.green;
  if (volatility < 3) return colors.yellow;
  return colors.crimson;
};
export const candleToDayData = async (candle: any): Promise<DayData> => {
  const usdInrRates = await getUsdInrRates();

  const d = new Date(candle.openTime);
  const date = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(d.getDate()).padStart(2, "0")}`;

  const open = candle.open;
  const close = candle.close;
  const high = candle.high;
  const low = candle.low;
  const volume = candle.volume;

  const performance = Number((((close - open) / open) * 100).toFixed(2));
  const volatility = Number((((high - low) / open) * 100).toFixed(2));
  const liquidity = Number(volume.toFixed(2));

  const usdInr = usdInrRates[date]?.INR;

  const rate = usdInr ?? getNearestRate(usdInrRates, date);

  const price = close * rate;

  return { date, volatility, liquidity, performance, price };
};

export async function getUsdInrRates() {
  const today = new Date();
  const end = today.toISOString().split("T")[0];
  const start = new Date(today);
  start.setMonth(start.getMonth() - 4);
  const startStr = start.toISOString().split("T")[0];

  const res = await fetch(
    `https://api.frankfurter.dev/v1/${startStr}..${end}?base=USD&symbols=INR`
  );
  const data = await res.json();
  return data.rates;
}

function getNearestRate(
  rates: Record<string, { INR: number }>,
  date: string
): number {
  const dates = Object.keys(rates).sort();
  let nearest = dates[0];
  for (const d of dates) {
    if (d <= date) nearest = d;
  }
  return rates[nearest].INR;
}
export const buildCustomRangeData = (
  startDate: string,
  endDate: string,
  daysData: Record<string, DayData>
): DayData | null => {
  const start = daysData[startDate];
  const end = daysData[endDate];

  if (!start || !end) return null;

  const performance = ((end.price - start.price) / start.price) * 100;

  return {
    date: `${formatDate(startDate)} → ${formatDate(endDate)}`,
    price: end.price,
    start_price: start.price,
    performance: Number(performance.toFixed(2)),
    volatility: 0,
    liquidity: 0,
  };
};
