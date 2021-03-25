import React from "react";
import { View, StyleSheet, Text } from "react-native";
import useTheme from "../hooks/useTheme";
import Clipboard from "expo-clipboard";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Toast } from "../utils/helper";

export default ({ label = "", value = "" }) => {
  const colorScheme = useTheme();
  const textColor = colorScheme.colors.text;

  const copy = () => {
    if (value) {
      Clipboard.setString(value);
      Toast(`已复制${label}`);
    }
  };

  return (
    <TouchableOpacity onLongPress={copy}>
      <View style={styles._listItem}>
        <Text style={{ ...styles.label, color: textColor }}>{label}</Text>
        <View style={{ flex: 1 }}>
          <Text style={{ ...styles.value, color: textColor }}>{value}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  _listItem: {
    display: "flex",
    flexDirection: "row",
    paddingVertical: 1,
    marginBottom: 2,
  },
  label: {
    width: 70,
  },
  value: {
    fontWeight: "bold",
  },
});
