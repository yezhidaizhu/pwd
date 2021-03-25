import React from "react";
import { View, StyleSheet } from "react-native";

export default ({ h = 1 }: { h?: number }) => {
  const height = 16 * h;
  return <View style={{ height }}></View>;
};

const styles = StyleSheet.create({
  box: {
    height: 16,
  },
});
