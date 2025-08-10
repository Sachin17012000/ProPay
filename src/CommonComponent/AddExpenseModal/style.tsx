import { StyleSheet } from "react-native";
import colors from "../Theme/Color";

export default StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: colors.shadowBlack,
    justifyContent: "flex-end",
  },
  container: {
    backgroundColor: colors.ivory,
    padding: 20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: colors.lightShadowBlack,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  header: {
    marginBottom: 14,
    color: colors.darkCharcoal,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginVertical: 8,
    backgroundColor: colors.veryoffWhite,
  },
  switchRow: {
    flexDirection: "row",
    marginBottom: 14,
    borderRadius: 8,
    backgroundColor: colors.veryLightGray,
    overflow: "hidden",
  },
  switchBtn: {
    flex: 1,
    padding: 12,
    alignItems: "center",
  },
  active: {
    backgroundColor: colors.green,
  },
  activeText: { color: colors.ivory, fontWeight: "600" },
  inactiveText: { color: colors.mediumGray },

  dateText: {
    color: colors.granite,
    marginVertical: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: colors.extraLightGray,
    borderRadius: 8,
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    gap: 10,
  },
  cancel: {
    flex: 1,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: colors.ash,
    borderRadius: 8,
    alignItems: "center",
    backgroundColor: colors.ivory,
  },
  cancelText: { color: colors.noteGrey, fontWeight: "500" },
  save: {
    flex: 1,
    backgroundColor: colors.green,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  saveText: { color: colors.ivory },

  categoryChip: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.ash,
    marginRight: 10,
    marginVertical: 12,
    backgroundColor: colors.ivory,
    shadowColor: colors.lightShadowBlack,
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  selectedCategoryChip: {
    backgroundColor: colors.lightBlue,
    borderColor: colors.lightBlue,
  },
  categoryChipText: {
    marginLeft: 6,
    color: colors.granite,
  },
  label: {
    marginTop: 16,
    color: colors.darkMediumGray,
  },
});
