import React from "react";
import { Text as RNText, TextProps } from "react-native";
import typography from "../Theme/Typography";

type TextType = keyof typeof typography.textVariants;

interface CustomTextProps extends TextProps {
  textType?: TextType;
  children: React.ReactNode;
}

export default function Text({
  textType = "baseRegular",
  children,
  style,
  ...props
}: CustomTextProps) {
  const variantStyle = typography.textVariants[textType];

  return (
    <RNText style={[variantStyle, style]} {...props}>
      {children}
    </RNText>
  );
}
