import { StyleSheet } from "react-native";
import colors from "../../CommonComponent/Theme/Color";

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: colors.background,
    flexGrow: 1,
  },
  greeting: {
    marginBottom: 20,
  },
  balanceCard: {
    backgroundColor: colors.cardBackground,
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 3,
  },
  balanceLabel: {
    color: colors.lebel,
  },
  balanceAmount: {
    marginVertical: 5,
  },
  lastUpdated: {
    color: colors.infoText,
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
  },
  actionButton: {
    flex: 1,
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  actionText: {
    textAlign: "center",
    color: colors.buttonText,
  },
  sectionTitle: {
    marginBottom: 10,
  },
  transactionCard: {
    backgroundColor: colors.cardBackground,
    padding: 15,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    elevation: 1,
  },
  transactionName: {
    color: colors.transactionName,
  },
  transactionAmount: {},
});

export default styles;
