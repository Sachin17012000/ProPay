import { StyleSheet } from "react-native";
import colors from "../../CommonComponent/Theme/Color";

export default StyleSheet.create({
  container: { flex: 1, paddingTop: 40, paddingHorizontal: 10 },
  title: {
    textAlign: "center",
    marginBottom: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    minHeight: 200,
  },
  modalTitle: { marginBottom: 10 },
  detailText: { marginBottom: 8 },
  closeBtn: {
    marginTop: 20,
    padding: 10,
    backgroundColor: colors.blue,
    borderRadius: 8,
    alignItems: "center",
  },
  closeBtnText: { color: "white", fontWeight: "bold" },
  timeframeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
  timeframeBtn: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 20,
    marginHorizontal: 5,
    backgroundColor: colors.white,
  },
  activeTimeframeBtn: {
    backgroundColor: colors.mint,
    borderColor: colors.mint,
  },
});
