import React from "react";
import { StyleSheet } from "react-native";
import { BaseToast, ErrorToast } from "react-native-toast-message";
import colors from "./Theme/Color";

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
    backgroundColor: colors.lightWhite,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.lightGreen,
  },
  errorToast: {
    borderLeftColor: "red",
    backgroundColor: colors.lightPink,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.pink,
  },
  text1: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.lightShadowBlack,
  },
  text2: {
    fontSize: 18,
    color: colors.granite,
  },
});
