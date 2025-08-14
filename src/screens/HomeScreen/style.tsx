import { StyleSheet } from "react-native";
import colors from "../../CommonComponent/Theme/Color";

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: colors.white,
    flexGrow: 1,
    paddingBottom: 40,
  },
  greeting: {
    marginBottom: 20,
  },
  balanceCard: {
    paddingVertical: 28,
    paddingHorizontal: 24,
    borderRadius: 20,
    alignItems: "center",
  },
  balanceLabel: {
    color: colors.balancedWhite,
  },
  balanceAmount: {
    color: colors.white,
    marginBottom: 6,
  },
  lastUpdated: {
    color: colors.offBlue,
  },
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
  featureGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
});

export default styles;
