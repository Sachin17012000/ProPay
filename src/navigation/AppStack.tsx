import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import AddMoneyScreen from "../screens/AddMoneyScreen";
import SendMoneyScreen from "../screens/SendMoneyScreen";
import TransactionsScreen from "../screens/TransactionsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { TouchableOpacity, View } from "react-native";
import { useAppNavigation } from "../hooks/useAppNavigation";
import { useAppSelector } from "../hooks/hook";
import { getInitials } from "../utils/utils";
import ExpenseTracker from "../screens/ExpenseTracker";
import colors from "../CommonComponent/Theme/Color";
import Text from "../CommonComponent/Text";
const Stack = createNativeStackNavigator();

export default function AppStack() {
  const navigation = useAppNavigation();
  const user = useAppSelector((state) => state.user.user);

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
                  backgroundColor: colors.royalBlue,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  textType="semiRegularBold"
                  style={{
                    color: colors.ivory,
                  }}
                >
                  {getInitials(user)}
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
      <Stack.Screen name="ExpenseTracker" component={ExpenseTracker} />
    </Stack.Navigator>
  );
}
