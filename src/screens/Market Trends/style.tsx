import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: { flex: 1, paddingTop: 40 },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  detailsText: { fontSize: 16 },
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
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  detailText: { fontSize: 16, marginBottom: 8 },
  closeBtn: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#007bff",
    borderRadius: 8,
    alignItems: "center",
  },
  closeBtnText: { color: "white", fontWeight: "bold" },
});
