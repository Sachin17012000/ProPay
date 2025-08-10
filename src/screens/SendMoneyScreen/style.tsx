import { StyleSheet } from "react-native";
import colors from "../../CommonComponent/Theme/Color";

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.white,
    padding: 20,
  },
  balanceLabel: {
    marginBottom: 12,
    color: colors.grey,
  },
  title: {
    color: colors.black,
    marginBottom: 20,
  },
  sendButton: {
    backgroundColor: colors.blue,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 24,
  },
  sendButtonText: {
    color: colors.ivory,
  },
});
