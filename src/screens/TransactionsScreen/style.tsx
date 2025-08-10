import { StyleSheet } from "react-native";
import colors from "../../CommonComponent/Theme/Color";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 16,
  },
  title: {
    marginBottom: 12,
    color: colors.black,
  },
  transactionCard: {
    backgroundColor: colors.offWhite,
    padding: 16,
    borderRadius: 14,
    marginBottom: 14,
    borderColor: colors.ash,
    borderWidth: 1,
    shadowColor: colors.lightShadowBlack,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  trackedTransactionCard: {
    backgroundColor: colors.lightWhite,
    borderColor: colors.emerald,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  transactionName: {
    color: colors.granite,
  },
  transactionAmount: {
    fontWeight: "bold",
  },
  transactionDate: {
    color: colors.grey,
  },
  transactionNote: {
    color: colors.noteGrey,
    fontStyle: "italic",
  },
  emptyMessage: {
    textAlign: "center",
    color: colors.mist,
    marginTop: 40,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: colors.ash,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 4,
  },
  filterButtonText: {
    color: colors.black,
    textAlign: "center",
  },
  activeFilterButton: {
    backgroundColor: colors.blue,
    borderColor: colors.blue,
  },
  activeFilterButtonText: {
    color: colors.ivory,
  },
  dateCategoryView: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
});

export default styles;
