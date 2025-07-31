import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./AuthStack";
import AppStack from "./AppStack";
import { useAppDispatch, useAppSelector } from "../hooks/hook";
import { useEffect, useState } from "react";
import { getCurrentUser } from "../utils/storage";

export default function RootNavigator() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const restoreSession = async () => {
      const storedUser = await getCurrentUser();
      if (storedUser) {
        dispatch({ type: "user/login/fulfilled", payload: storedUser });
      }
      setLoading(false);
    };
    restoreSession();
  }, []);

  if (loading) return null;

  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
