import { StyleSheet } from "react-native";
import colors from "../../CommonComponent/Theme/Color";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: colors.white,
  },
  title: {
    marginBottom: 24,
    textAlign: "center",
  },
  textInput: {
    borderWidth: 1,
    borderColor: colors.silver,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 18,
    marginBottom: 16,
  },
  registerLink: {
    color: colors.royalBlue,
    marginTop: 15,
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
});

export default styles;
