import React, { memo } from "react";
import { Text } from "react-native";
import useTheme from "../hooks/useTheme";

export default memo((props: any) => {
  const colorScheme = useTheme();
  const fontColor = colorScheme.colors.text;
  const { style = {} } = props;
  return (
    <Text {...props} style={{ color: fontColor, ...style }}>
      {props.children}
    </Text>
  );
});
