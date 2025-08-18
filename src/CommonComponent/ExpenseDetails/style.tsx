import { StyleSheet } from "react-native";
import colors from "../Theme/Color";

export default StyleSheet.create({
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
  title: {
    color: colors.black,
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
  budgetButton: {
    marginTop: 5,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: colors.blue,
    alignSelf: "flex-start",
  },
});
