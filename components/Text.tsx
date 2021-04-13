import React, { memo } from "react";
import { Text, View } from "react-native";
import useTheme from "../hooks/useTheme";

export default memo((props: any) => {
  const colorScheme = useTheme();
  const fontColor = colorScheme.colors.text;
  const secondaryText = colorScheme.colors.secondaryText;
  const { style = {}, secondary = false } = props;

  const color = secondary ? secondaryText : fontColor;

  return (
    <View>
      <Text {...props} style={{ color, ...style }}>
        {props.children}
      </Text>
    </View>
  );
});
