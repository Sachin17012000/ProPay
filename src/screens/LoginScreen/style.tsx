import { StyleSheet } from "react-native";
import colors from "../../CommonComponent/Theme/Color";

const styles = StyleSheet.create({
  scrollViewStyle: { flexGrow: 1, justifyContent: "center" },
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
  imageStyle: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    marginBottom: -50,
  },
  imageView: { alignItems: "center" },
});

export default styles;
