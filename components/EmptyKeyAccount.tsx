import React from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-elements";
import Text from "./Text";

export default ({ onPress, hidden }: { onPress: any; hidden: boolean }) => {
  return (
    <View
      style={{
        ...styles.body,
        display: hidden ? "flex" : "none",
      }}
    >
      <View>
        <Text style={styles.desc}>暂无任何密码数据</Text>
      </View>
      <View style={styles.btn}>
        <Button title="前往增加" type="outline" onPress={onPress} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    height: "100%",
    // marginTop: 64,
    justifyContent: "space-around",
    alignItems: "center",
  },
  btn: {
    width: "60%",
  },
  desc: {
    fontSize: 20,
  },
});
