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
  card: {
    backgroundColor: colors.offWhite,
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 2,
  },
  label: {
    marginTop: 12,
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
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: colors.ash,
    borderRadius: 8,
    padding: 10,
    marginVertical: 10,
  },
  saveButton: {
    backgroundColor: colors.blue,
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },

  saveButtonText: {
    color: colors.ivory,
  },

  link: {
    color: colors.blue,
  },
});
