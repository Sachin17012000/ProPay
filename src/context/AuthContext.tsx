import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Transaction } from "../types";

type User = {
  name: string;
  email: string;
  balance: number;
  transactions: Transaction[];
};
const STORAGE_KEY = "wallet_user";

type AuthContextType = {
  isLoggedIn: boolean;
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  addMoney: (amount: number) => void;
  sendMoney: (to: string, amount: number, note?: string) => void;
  deleteTransaction: (id: string) => void;
  updateUser: (updates: Partial<User>) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      const storedUser = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        setUser(parsed);
        setIsLoggedIn(true);
      }
    };
    loadUser();
  }, []);

  useEffect(() => {
    if (user) {
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    }
  }, [user]);
  const login = (userData: User) => {
    setUser(userData);
    setIsLoggedIn(true);
  };
  const logout = async () => {
    setIsLoggedIn(false);
    setUser(null);
    await AsyncStorage.removeItem(STORAGE_KEY);
  };
  const addMoney = (amount: number) => {
    setUser((prevUser) => {
      if (!prevUser) return prevUser;

      return {
        ...prevUser,
        balance: prevUser.balance + amount,
        transactions: [
          {
            id: Date.now().toString(),
            type: "add",
            amount,
            date: new Date().toLocaleDateString(),
            note: "Money added to wallet",
          },
          ...(prevUser.transactions || []),
        ],
      };
    });
  };
  const sendMoney = (to: string, amount: number, note?: string) => {
    if (!user || user.balance < amount) return;

    const newTransaction: Transaction = {
      id: Date.now().toString(),
      type: "send",
      amount,
      to,
      date: new Date().toLocaleDateString(),
      note,
    };

    setUser((prev) =>
      prev
        ? {
            ...prev,
            balance: prev.balance - amount,
            transactions: [newTransaction, ...prev.transactions],
          }
        : prev
    );
  };
  const deleteTransaction = (id: string) => {
    setUser((prev) =>
      prev
        ? {
            ...prev,
            transactions: prev.transactions.filter((t) => t.id !== id),
          }
        : prev
    );
  };
  const updateUser = (updates: Partial<User>) => {
    setUser((prev) => (prev ? { ...prev, ...updates } : prev));
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
        user,
        addMoney,
        sendMoney,
        deleteTransaction,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
