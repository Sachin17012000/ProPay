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
  balanceHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
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
  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.blue,
    paddingVertical: 12,
    borderRadius: 12,
    marginHorizontal: 6,
    shadowColor: colors.lightShadowBlack,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionIcon: {
    marginRight: 8,
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
  featureRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 16,
  },
  featureCard: {
    flex: 1,
    backgroundColor: colors.lightOffWhite,
    padding: 16,
    marginHorizontal: 8,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },
  featureLabel: {
    marginTop: 8,
    color: colors.lightBlack,
  },
  featureGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
});

export default styles;
