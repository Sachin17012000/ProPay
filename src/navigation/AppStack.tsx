import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import AddMoneyScreen from "../screens/AddMoneyScreen";
import SendMoneyScreen from "../screens/SendMoneyScreen";
import TransactionsScreen from "../screens/TransactionsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { TouchableOpacity, View, Text } from "react-native";
import { useAppNavigation } from "../hooks/useAppNavigation";
import { useAuth } from "../context/AuthContext";
import React from "react";

const Stack = createNativeStackNavigator();

export default function AppStack() {
  const navigation = useAppNavigation();
  const { user } = useAuth();

  const getInitials = () => {
    const name = user?.name?.trim() || "";
    const words = name.split(" ");
    const initials =
      words.length >= 2
        ? words[0][0].toUpperCase() + words[1][0].toUpperCase()
        : words[0]?.[0]?.toUpperCase() || "?";
    return initials;
  };

  return (
    <Stack.Navigator id={undefined}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Home",
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Profile")}
              style={{ marginRight: 16 }}
            >
              <View
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 18,
                  backgroundColor: "#1e40af", // Use your primary color
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{ color: "#fff", fontWeight: "bold", fontSize: 14 }}
                >
                  {getInitials()}
                </Text>
              </View>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen name="AddMoney" component={AddMoneyScreen} />
      <Stack.Screen name="SendMoney" component={SendMoneyScreen} />
      <Stack.Screen name="Transactions" component={TransactionsScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
}
