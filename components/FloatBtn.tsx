import React from "react";
import { View } from "react-native";
import ActionButton from "react-native-action-button";

export default ({ navigation }: { navigation: any }) => {
  return (
    <ActionButton
      style={{ zIndex: 10 }}
      buttonColor="#9c26b0"
      onPress={() => navigation.navigate("Add")}
    />
  );
};
