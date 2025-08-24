import { StyleSheet } from "react-native";
import colors from "../../CommonComponent/Theme/Color";

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: colors.white,
  },
  title: {
    marginBottom: 20,
    color: colors.black,
  },
  button: {
    backgroundColor: colors.blue,
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    alignItems: "center",
  },
  buttonText: {
    color: colors.ivory,
  },
  profileCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.blue,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 20,
  },
  initials: {
    color: colors.ivory,
  },
});
