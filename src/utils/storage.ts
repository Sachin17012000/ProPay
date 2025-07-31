// utils/asyncStorageUtils.ts

import AsyncStorage from "@react-native-async-storage/async-storage";
import { User, UserWithPassword, Transaction } from "../types";

const USERS_KEY = "REGISTERED_USERS";
const CURRENT_USER_KEY = "CURRENT_USER";
const TRANSACTIONS_KEY = "SAVED_TRANSACTIONS";

export const saveRegisteredUsers = async (users: UserWithPassword[]) => {
  try {
    const json = JSON.stringify(users);
    await AsyncStorage.setItem(USERS_KEY, json);
  } catch (e) {
    console.error("Failed to save users", e);
  }
};

export const getRegisteredUsers = async (): Promise<UserWithPassword[]> => {
  try {
    const json = await AsyncStorage.getItem(USERS_KEY);
    return json ? JSON.parse(json) : [];
  } catch (e) {
    console.error("Failed to load users", e);
    return [];
  }
};

export const saveCurrentUser = async (user: User) => {
  try {
    await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  } catch (e) {
    console.error("Failed to save current user", e);
  }
};

export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const json = await AsyncStorage.getItem(CURRENT_USER_KEY);
    return json ? JSON.parse(json) : null;
  } catch (e) {
    console.error("Failed to get current user", e);
    return null;
  }
};

export const removeCurrentUser = async () => {
  try {
    await AsyncStorage.removeItem(CURRENT_USER_KEY);
  } catch (e) {
    console.error("Failed to remove current user", e);
  }
};
export const getSavedTransactions = async (): Promise<Transaction[]> => {
  try {
    const json = await AsyncStorage.getItem(TRANSACTIONS_KEY);
    return json ? JSON.parse(json) : [];
  } catch (e) {
    console.error("Failed to get transactions", e);
    return [];
  }
};
export const saveTransaction = async (txn: Transaction) => {
  try {
    const existing = await getSavedTransactions();
    const updated = [txn, ...existing];
    await AsyncStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error("Failed to save transaction", e);
  }
};
export const clearSavedTransactions = async () => {
  try {
    await AsyncStorage.removeItem(TRANSACTIONS_KEY);
  } catch (e) {
    console.error("Failed to clear transactions", e);
  }
};
