import { StyleSheet } from "react-native";
import colors from "../Theme/Color";

export default StyleSheet.create({
  card: {
    backgroundColor: colors.offWhite,
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 2,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    marginTop: 12,
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
  input: {
    borderWidth: 1,
    borderColor: colors.ash,
    borderRadius: 8,
    padding: 10,
    marginVertical: 10,
  },
});
