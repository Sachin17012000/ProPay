import { createAsyncThunk } from "@reduxjs/toolkit";
import { User, UserWithPassword } from "../../../types";
import {
  saveRegisteredUsers,
  getRegisteredUsers,
  saveCurrentUser,
  removeCurrentUser,
  getCurrentUser,
} from "../../../utils/storage";
import { randomId } from "../../../utils/utils";

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

interface LoginPayload {
  email: string;
  password: string;
}

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const loginThunk = createAsyncThunk<
  User,
  LoginPayload,
  { rejectValue: string }
>("user/login", async ({ email, password }, { rejectWithValue }) => {
  await delay(1000);

  const users: UserWithPassword[] = await getRegisteredUsers();

  const found = users.find((u) => u.email === email && u.password === password);

  if (!found) return rejectWithValue("Invalid credentials");

  const { password: _, ...userWithoutPassword } = found;
  await saveCurrentUser(userWithoutPassword);

  return userWithoutPassword;
});

export const registerThunk = createAsyncThunk<
  User,
  RegisterPayload,
  { rejectValue: string }
>("user/register", async ({ name, email, password }, { rejectWithValue }) => {
  await delay(1500);

  const users: UserWithPassword[] = await getRegisteredUsers();

  const existing = users.find((u) => u.email === email);
  if (existing) return rejectWithValue("Email is already registered");

  const newUser: UserWithPassword = {
    id: randomId,
    name,
    email,
    password,
    token: "mock-token-" + Date.now(),
    balance: Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000,
  };

  const updatedUsers = [...users, newUser];
  await saveRegisteredUsers(updatedUsers);

  const { password: _, ...userWithoutPassword } = newUser;
  await saveCurrentUser(userWithoutPassword);

  return userWithoutPassword;
});

export const logoutThunk = createAsyncThunk("user/logout", async () => {
  await removeCurrentUser();
});
export const updateUserThunk = createAsyncThunk<
  User,
  Partial<User>,
  { rejectValue: string }
>("user/updateUser", async (updatedFields, { rejectWithValue }) => {
  await delay(1500);

  const currentUser = await getCurrentUser();
  if (!currentUser) return rejectWithValue("No user is currently logged in");

  const updatedUser: User = { ...currentUser, ...updatedFields };

  const users: UserWithPassword[] = await getRegisteredUsers();
  const updatedUsers = users.map((user) =>
    user.id === currentUser.id ? { ...user, ...updatedFields } : user
  );
  await saveRegisteredUsers(updatedUsers as UserWithPassword[]);

  await saveCurrentUser(updatedUser);

  return updatedUser;
});
