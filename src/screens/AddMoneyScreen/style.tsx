import { StyleSheet } from "react-native";
import colors from "../../CommonComponent/Theme/Color";

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: colors.ivory,
  },
  title: {
    marginBottom: 16,
  },
  balanceLabel: {
    marginBottom: 12,
    color: colors.grey,
  },
  input: {
    marginBottom: 20,
  },
  paymentMethodBox: {
    padding: 12,
    backgroundColor: colors.softGray,
    borderRadius: 8,
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: colors.blue,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  addButtonText: {
    color: colors.ivory,
  },
});
