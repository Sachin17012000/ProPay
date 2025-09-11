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
    backgroundColor: "#007bff",
    borderRadius: 8,
    alignItems: "center",
  },
  closeBtnText: { color: "white", fontWeight: "bold" },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: colors.ash,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 4,
  },
  filterButtonText: {
    color: colors.black,
    textAlign: "center",
  },
  activeFilterButton: {
    backgroundColor: colors.blue,
    borderColor: colors.blue,
  },
  activeFilterButtonText: {
    color: colors.ivory,
  },
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
