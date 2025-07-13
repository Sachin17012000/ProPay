import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import SendMoneyScreen from "../screens/SendMoneyScreen";
import TransactionsScreen from "../screens/TransactionsScreen/index";
import ProfileScreen from "../screens/ProfileScreen/index";
import AddMoneyScreen from "../screens/AddMoneyScreen";

const Stack = createNativeStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator id={undefined} initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="SendMoney" component={SendMoneyScreen} />
      <Stack.Screen name="Transactions" component={TransactionsScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="AddMoney" component={AddMoneyScreen} />
    </Stack.Navigator>
  );
}
