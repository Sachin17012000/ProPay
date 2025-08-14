import { StyleSheet } from "react-native";
import colors from "../../CommonComponent/Theme/Color";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 100,
    backgroundColor: colors.white,
  },
  title: {
    marginBottom: 24,
    textAlign: "center",
  },
  button: {
    backgroundColor: colors.blue,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 5,
  },
  buttonText: {
    color: colors.ivory,
  },
  linkTextView: {
    flexDirection: "row",
    marginTop: 15,
    alignSelf: "center",
  },
  loginButton: {
    marginLeft: 10,
    color: colors.royalBlue,
  },
});

export default styles;
