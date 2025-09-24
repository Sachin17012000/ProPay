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
  balanceAnimationStyle: {
    borderRadius: 20,
    marginBottom: 24,
    overflow: "hidden",
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
  featureGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  imageStyle: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    marginBottom: -50,
    marginTop: -60,
  },
  imageView: {
    alignItems: "center",
  },
});

export default styles;
