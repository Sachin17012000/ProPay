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
});
