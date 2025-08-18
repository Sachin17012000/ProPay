import { StyleSheet } from "react-native";
import colors from "../Theme/Color";

export default StyleSheet.create({
  transactionTitle: {
    marginTop: 24,
    marginBottom: 8,
    color: colors.black,
  },
  transactionList: {
    paddingBottom: 60,
  },
  transactionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: colors.offWhite,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  transactionInfo: {
    flex: 1,
    marginRight: 12,
  },
  transactionCategory: {
    marginBottom: 2,
  },
  transactionMeta: {
    color: colors.noteGrey,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },
  emptyText: {
    marginTop: 10,
    color: colors.grey,
  },
});
