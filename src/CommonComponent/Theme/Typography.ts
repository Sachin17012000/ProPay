import { TextStyle } from "react-native";

type VariantStyles = {
  [key: string]: TextStyle;
};
const typography = {
  textVariants: {
    smallRegular: {
      fontSize: 12,
      fontWeight: "400",
    },
    smallBold: {
      fontSize: 12,
      fontWeight: "700",
    },
    semiRegular: {
      fontSize: 14,
      fontWeight: "400",
    },
    semiRegularBold: {
      fontSize: 14,
      fontWeight: "600",
    },
    baseRegular: {
      fontSize: 16,
      fontWeight: "400",
    },
    baseRegularBold: {
      fontSize: 16,
      fontWeight: "600",
    },
    mediumSemiBold: {
      fontSize: 18,
      fontWeight: "500",
    },
    baseMediumBold: {
      fontSize: 20,
      fontWeight: "700",
    },
    largeBold: {
      fontSize: 22,
      fontWeight: "700",
    },
    extraLargeBold: {
      fontSize: 28,
      fontWeight: "700",
    },
    headingBold: {
      fontSize: 32,
      fontWeight: "700",
    },
  } as VariantStyles,
  fontFamily: {
    regular: "System",
    bold: "System",
  },
};

export default typography;
