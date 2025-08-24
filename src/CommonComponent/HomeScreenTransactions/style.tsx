import { StyleSheet } from "react-native";
import colors from "../Theme/Color";

export default StyleSheet.create({
  sectionTitle: {
    marginBottom: 10,
  },
  transactionCard: {
    backgroundColor: colors.snowWhite,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    borderWidth: 1,
    borderColor: colors.coolGrey,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  transactionName: {
    color: colors.granite,
    flex: 1,
  },
  transactionAmount: {
    marginLeft: 8,
  },
  transactionDate: {
    color: colors.grey ?? colors.neutralGray,
  },
  transactionNote: {
    fontStyle: "italic",
    color: colors.noteGrey ?? colors.charcoalGray,
    marginLeft: 10,
  },
  viewAllButton: {
    marginTop: 12,
    marginBottom: 24,
    alignSelf: "center",
    backgroundColor: colors.balancedWhite,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  viewAllButtonText: {
    color: colors.royalBlue,
  },
});
