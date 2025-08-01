import React from "react";
import { StyleSheet } from "react-native";
import { BaseToast, ErrorToast } from "react-native-toast-message";

export const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={styles.successToast}
      text1Style={styles.text1}
      text2Style={styles.text2}
    />
  ),
  error: (props: any) => (
    <ErrorToast
      {...props}
      style={styles.errorToast}
      text1Style={styles.text1}
      text2Style={styles.text2}
    />
  ),
};
const styles = StyleSheet.create({
  successToast: {
    borderLeftColor: "green",
    backgroundColor: "#e6ffed",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#b3f0c6",
  },
  errorToast: {
    borderLeftColor: "red",
    backgroundColor: "#ffe6e6",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#f0b3b3",
  },
  text1: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  text2: {
    fontSize: 18,
    color: "#333",
  },
});
