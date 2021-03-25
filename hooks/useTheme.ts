import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import { useColorScheme } from "react-native";

export default () => {
  const colorScheme = useColorScheme();

  const isDark = colorScheme === "dark";

  const dark = { colors: { ...DarkTheme.colors, ...darkColors }, dark: true };
  const light = {
    colors: { ...DefaultTheme.colors, ...lightColors },
    dark: false,
  };

  return isDark ? dark : light;
};

const darkColors = {
  secondaryText: "#565656",
};

const lightColors = {
  secondaryText: "#797979",
};
