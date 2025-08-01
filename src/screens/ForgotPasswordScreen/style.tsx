import { StyleSheet } from "react-native";
import colors from "../../CommonComponent/Theme/Color";

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 280,
    backgroundColor: colors.background,
  },
  headingStyle: {
    alignSelf: "center",
    paddingBottom: 10,
  },
  button: {
    backgroundColor: colors.primary,
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
    color: colors.buttonText,
  },
  passwordInfoText: {
    paddingTop: 10,
    color: colors.success,
    alignSelf: "center",
  },
  registerLink: {
    color: colors.link,
    marginTop: 15,
    textAlign: "center",
  },
  passwordBox: {
    backgroundColor: "#F0F4FF",
    padding: 16,
    borderRadius: 10,
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#AAB2C8",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },

  passwordText: {
    color: "#333",
    fontSize: 16,
  },
});
export default style;
