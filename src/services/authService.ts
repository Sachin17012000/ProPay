import { Transaction } from "../types";

type User = {
  name: string;
  email: string;
  password?: string;
  balance: number;
  transactions: Transaction[];
};

const userDB: Record<string, User> = {
  "sachin121jindal@gmail.com": {
    name: "Test User",
    email: "sachin121jindal@gmail.com",
    password: "sachin",
    balance: 1000,
    transactions: [
      {
        id: "txn1",
        type: "add",
        amount: 2000,
        date: "10/07/2025",
        note: "Added via UPI",
      },
      {
        id: "txn2",
        type: "send",
        amount: 750,
        to: "Rahul Sharma",
        date: "09/07/2025",
        note: "For groceries",
      },
      {
        id: "txn3",
        type: "send",
        amount: 1200,
        to: "Electricity Board",
        date: "09/07/2025",
        note: "Electricity bill payment",
      },
    ],
  },
};

export const loginService = async (email: string, password: string) => {
  return new Promise<{ success: boolean; message: string; user?: User }>(
    (resolve) => {
      setTimeout(() => {
        const user = userDB[email];
        if (user && user.password === password) {
          resolve({ success: true, message: "Login successful", user });
        } else {
          resolve({ success: false, message: "Invalid credentials" });
        }
      }, 1000);
    }
  );
};

export const registerService = async (
  name: string,
  email: string,
  password: string
) => {
  return new Promise<{ success: boolean; message: string; user?: User }>(
    (resolve) => {
      setTimeout(() => {
        if (userDB[email]) {
          resolve({ success: false, message: "Email already exists" });
        } else {
          const newUser: User = {
            name,
            email,
            password,
            balance: 0,
            transactions: [],
          };
          userDB[email] = newUser;
          resolve({
            success: true,
            message: "Account created successfully",
            user: newUser,
          });
        }
      }, 1000);
    }
  );
};
