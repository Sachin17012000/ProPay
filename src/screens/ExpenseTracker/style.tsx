import { StyleSheet } from "react-native";
import colors from "../../CommonComponent/Theme/Color";

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.background,
    padding: 20,
  },
  headerView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    color: colors.textPrimary,
  },
  filterIconStyle: {
    padding: 8,
    backgroundColor: colors.secondary,
    borderRadius: 8,
  },
  expenseSummaryHeader: {
    flexDirection: "row",
  },
  chartBarIconStyle: {
    padding: 2,
    backgroundColor: colors.success,
    borderRadius: 4,
    marginRight: 8,
  },
  toggleSection: {
    flexDirection: "row",
    marginTop: 20,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 10,
    overflow: "hidden",
  },
  toggleTitle: {
    flex: 1,
    borderColor: colors.border,
    alignItems: "center",
    paddingVertical: 5,
  },
  activeToggle: {
    backgroundColor: colors.primary,
    borderRadius: 10,
  },
  toggleButtonText: {
    color: colors.textPrimary,
  },
  activeToggleButtonText: {
    color: colors.buttonText,
  },
  summarySection: {
    marginTop: 20,
    backgroundColor: colors.cardBackground,
    borderRadius: 10,
    padding: 15,
  },
  summaryLine: {
    color: colors.textPrimary,
    marginBottom: 5,
  },
  progressBarBackground: {
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.inputBorder,
    marginTop: 10,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: colors.primary,
    borderRadius: 5,
  },
  percentUsedText: {
    marginTop: 5,
    color: colors.textSecondary,
  },
  categoryTitle: {
    marginTop: 25,
    marginBottom: 10,
    fontSize: 16,
    color: colors.textPrimary,
  },
  categoryScrollView: {
    gap: 12,
  },
  categoryCard: {
    backgroundColor: colors.cardBackground,
    padding: 12,
    borderRadius: 10,
    width: 110,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  categoryText: {
    color: colors.textPrimary,
    marginBottom: 4,
  },
  categoryAmount: {
    color: colors.textSecondary,
  },

  transactionTitle: {
    fontSize: 16,
    marginTop: 24,
    marginBottom: 8,
    color: colors.textPrimary,
  },

  transactionList: {
    paddingBottom: 60,
  },

  transactionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    backgroundColor: colors.cardBackground,
    borderRadius: 10,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },

  transactionInfo: {
    flexDirection: "column",
  },

  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },

  emptyText: {
    marginTop: 10,
    fontSize: 14,
    color: colors.textSecondary,
  },

  fabButton: {
    position: "absolute",
    bottom: 30,
    right: 20,
    backgroundColor: colors.primary,
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  budgetButton: {
    marginTop: 5,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: colors.primary,
    alignSelf: "flex-start",
  },
});
