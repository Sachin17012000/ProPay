import RootNavigator from "./src/navigation/RootNavigator";
import Toast from "react-native-toast-message";
import { Provider } from "react-redux";
import { store } from "./src/store/store";
import { toastConfig } from "./src/CommonComponent/CustomToast";

export default function App() {
  return (
    <Provider store={store}>
      <RootNavigator />
      <Toast config={toastConfig} />
    </Provider>
  );
}
