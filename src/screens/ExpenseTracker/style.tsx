import { StyleSheet } from "react-native";
import colors from "../../CommonComponent/Theme/Color";

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.white,
    padding: 20,
  },
  headerView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    color: colors.black,
  },
  filterIconStyle: {
    padding: 8,
    backgroundColor: colors.orange,
    borderRadius: 8,
  },
  expenseSummaryHeader: {
    flexDirection: "row",
  },
  chartBarIconStyle: {
    padding: 2,
    backgroundColor: colors.emerald,
    borderRadius: 4,
    marginRight: 8,
  },
  toggleSection: {
    flexDirection: "row",
    marginTop: 20,
    borderColor: colors.ash,
    borderWidth: 1,
    borderRadius: 10,
    overflow: "hidden",
  },
  toggleTitle: {
    flex: 1,
    borderColor: colors.ash,
    alignItems: "center",
    paddingVertical: 5,
  },
  activeToggle: {
    backgroundColor: colors.blue,
    borderRadius: 10,
  },
  toggleButtonText: {
    color: colors.black,
  },
  activeToggleButtonText: {
    color: colors.ivory,
  },
  summarySection: {
    marginTop: 20,
    backgroundColor: colors.offWhite,
    borderRadius: 10,
    padding: 15,
  },
  summaryLine: {
    color: colors.black,
    marginBottom: 5,
  },
  progressBarBackground: {
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.silver,
    marginTop: 10,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: colors.blue,
    borderRadius: 5,
  },
  percentUsedText: {
    marginTop: 5,
    color: colors.grey,
  },
  categoryTitle: {
    marginTop: 25,
    marginBottom: 10,
    color: colors.black,
  },
  categoryScrollView: {
    gap: 12,
  },
  categoryCard: {
    backgroundColor: colors.offWhite,
    padding: 12,
    borderRadius: 10,
    width: 110,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  categoryText: {
    color: colors.black,
    marginBottom: 4,
  },
  categoryAmount: {
    color: colors.grey,
  },
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
    padding: 12,
    backgroundColor: colors.offWhite,
    borderRadius: 10,
    marginBottom: 8,
    shadowColor: colors.lightShadowBlack,
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
    color: colors.grey,
  },
  fabButton: {
    position: "absolute",
    bottom: 30,
    right: 20,
    backgroundColor: colors.blue,
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: colors.lightShadowBlack,
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
    backgroundColor: colors.blue,
    alignSelf: "flex-start",
  },
});
