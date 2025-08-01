import { StyleSheet } from "react-native";
import colors from "../../CommonComponent/Theme/Color";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 100,
    backgroundColor: colors.background,
  },
  title: {
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 18,
    marginBottom: 16,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 5,
  },
  buttonText: {
    color: colors.buttonText,
  },
  linkTextView: {
    flexDirection: "row",
    marginTop: 15,
    alignSelf: "center",
  },
  loginButton: {
    marginLeft: 10,
    color: colors.link,
  },
  error: {
    color: "red",
    marginBottom: 8,
  },
});

export default styles;
