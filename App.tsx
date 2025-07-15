import { AuthProvider } from "./src/context/AuthContext";
import RootNavigator from "./src/navigation/RootNavigator";
import Toast from "react-native-toast-message";

export default function App() {
  return (
    <AuthProvider>
      <RootNavigator />
      <Toast />
    </AuthProvider>
  );
}
