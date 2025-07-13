import React, { createContext, useContext, useState } from "react";
import { Transaction } from "../types";

type User = {
  name: string;
  email: string;
  balance: number;
  transactions: Transaction[];
};

type AuthContextType = {
  isLoggedIn: boolean;
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  balance: number;
  addMoney: (amount: number) => void;
  sendMoney: (to: string, amount: number) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [balance, setBalance] = useState(12500);

  const login = (userData: User) => {
    setUser(userData);
    setIsLoggedIn(true);
  };
  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setBalance(12500);
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
  const sendMoney = (to: string, amount: number) => {
    if (!user || user.balance < amount) return;

    const newTransaction: Transaction = {
      id: Date.now().toString(),
      type: "send",
      amount,
      to,
      date: new Date().toISOString(),
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

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, login, logout, user, balance, addMoney, sendMoney }}
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
