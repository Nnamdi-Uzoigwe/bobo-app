import React from "react";
import { Text, TextProps } from "react-native";

type FontWeight =
  | "light"
  | "regular"
  | "medium"
  | "semibold"
  | "bold"
  | "extrabold"
  | "italic";

interface AppTextProps extends TextProps {
  children: React.ReactNode;
  className?: string;
  weight?: FontWeight;
  size?: number;
  color?: string;
}

const fontMap = {
  light: "Poppins-Light",
  regular: "Poppins-Regular",
  medium: "Poppins-Medium",
  semibold: "Poppins-SemiBold",
  bold: "Poppins-Bold",
  extrabold: "Poppins-ExtraBold",
  italic: "Poppins-Italic",
};

export default function AppText({
  children,
  className,
  weight = "regular",
  size,
  color,
  style,
  ...props
}: AppTextProps) {
  return (
    <Text
      className={className}
      style={[
        {
          fontFamily: fontMap[weight],
          fontSize: size,
          color,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
}
