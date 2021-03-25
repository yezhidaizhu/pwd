import React from "react";
import { View } from "react-native";
import ActionButton from "react-native-action-button";

export default ({ navigation, update }: { navigation: any; update: any }) => {
  return (
    <ActionButton
      style={{ zIndex: 10 }}
      buttonColor="rgba(231,76,60,1)"
      onPress={() => navigation.navigate("Add", { update })}
    />
  );
};
