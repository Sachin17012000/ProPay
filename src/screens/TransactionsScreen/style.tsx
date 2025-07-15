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
  },
  transactionCard: {
    backgroundColor: colors.cardBackground,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderColor: colors.border,
    borderWidth: 1,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  transactionName: {
    color: colors.transactionName,
  },
  transactionAmount: {
    fontWeight: "bold",
  },
  transactionDate: {
    color: colors.textSecondary,
  },
  transactionNote: {
    color: colors.note,
    fontStyle: "italic",
  },
  emptyMessage: {
    textAlign: "center",
    color: colors.infoText,
    marginTop: 40,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterButtonText: {
    color: colors.textPrimary,
  },
  activeFilterButton: {
    backgroundColor: colors.primary,
  },
  activeFilterButtonText: {
    color: colors.buttonText,
  },
});

export default styles;
