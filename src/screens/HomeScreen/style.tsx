import { StyleSheet } from "react-native";
import colors from "../../CommonComponent/Theme/Color";

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: colors.background,
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
    fontSize: 15,
    color: "#e0f2fe",
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 6,
  },
  lastUpdated: {
    fontSize: 12,
    color: "#bae6fd",
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
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 12,
    marginHorizontal: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionIcon: {
    marginRight: 8,
  },
  actionText: {
    color: colors.buttonText,
    fontSize: 16,
  },
  sectionTitle: {
    marginBottom: 10,
  },
  transactionCard: {
    backgroundColor: "#f9fafb",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  transactionName: {
    color: colors.transactionName,
    flex: 1,
  },
  transactionAmount: {
    fontWeight: "bold",
    marginLeft: 8,
  },
  transactionDate: {
    fontSize: 12,
    color: colors.textSecondary ?? "#999",
  },
  transactionNote: {
    fontSize: 12,
    fontStyle: "italic",
    color: colors.note ?? "#666",
    marginLeft: 10,
  },
  viewAllButton: {
    marginTop: 12,
    marginBottom: 24,
    alignSelf: "center",
    backgroundColor: "#e0f2fe",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  viewAllButtonText: {
    color: colors.link,
    fontWeight: "600",
  },
});

export default styles;
