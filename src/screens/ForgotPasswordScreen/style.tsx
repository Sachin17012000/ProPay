import { StyleSheet } from "react-native";
import colors from "../../CommonComponent/Theme/Color";

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 280,
    backgroundColor: colors.white,
  },
  headingStyle: {
    alignSelf: "center",
    paddingBottom: 10,
  },
  button: {
    backgroundColor: colors.blue,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 5,
  },
  disableButton: {
    backgroundColor: "grey",
    opacity: 0.6,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 5,
  },
  buttonText: {
    color: colors.ivory,
  },
  passwordInfoText: {
    paddingTop: 10,
    color: colors.emerald,
    alignSelf: "center",
  },
  registerLink: {
    color: colors.royalBlue,
    marginTop: 15,
    textAlign: "center",
  },
  passwordBox: {
    backgroundColor: colors.paleBlue,
    padding: 16,
    borderRadius: 10,
    marginTop: 20,
    borderWidth: 1,
    borderColor: colors.dustyBlue,
    shadowColor: colors.lightShadowBlack,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  passwordText: {
    color: colors.granite,
  },
});
export default style;
