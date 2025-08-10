import { StyleSheet } from "react-native";
import colors from "../../CommonComponent/Theme/Color";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
  },
  title: {
    marginBottom: 12,
    color: colors.textPrimary,
    // fontSize: 20,
    // fontWeight: "bold",
  },
  transactionCard: {
    backgroundColor: colors.cardBackground,
    padding: 16,
    borderRadius: 14,
    marginBottom: 14,
    borderColor: colors.border,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  trackedTransactionCard: {
    backgroundColor: "#e6ffed", // light green for tracked
    borderColor: "#70db8f",
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  transactionName: {
    color: colors.transactionName,
    // fontSize: 15,
    // fontWeight: "500",
  },
  transactionAmount: {
    fontWeight: "bold",
    // fontSize: 16,
  },
  transactionDate: {
    color: colors.textSecondary,
    // fontSize: 12,
  },
  transactionNote: {
    color: colors.note,
    fontStyle: "italic",
    // fontSize: 12,
  },
  emptyMessage: {
    textAlign: "center",
    color: colors.infoText,
    marginTop: 40,
    // fontSize: 14,
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
    borderColor: colors.border,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 4,
  },
  filterButtonText: {
    color: colors.textPrimary,
    // fontSize: 14,
    textAlign: "center",
  },
  activeFilterButton: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  activeFilterButtonText: {
    color: colors.buttonText,
    // fontWeight: "600",
  },
  dateCategoryView: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  transactionCategory: {
    // marginTop: 2,
    color: "#6B7280",
    // fontStyle: "italic",
  },
});

export default styles;
