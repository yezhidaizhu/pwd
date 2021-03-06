import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Fumi } from "react-native-textinput-effects";
import Ionicons from "react-native-vector-icons/Ionicons";
import useTheme from "../hooks/useTheme";
import Textarea from "react-native-textarea";

type PWD = {
  title?: string;
  name?: string;
  phone?: string;
  mail?: string;
  password?: string;
  remarks?: string;
};

export default ({
  setData,
  account,
  inputkey = "input",
}: {
  setData: any;
  account: PWD;
  inputkey?: any;
}) => {
  const colorScheme = useTheme();
  const fontColor = colorScheme.colors.text;
  const secondaryText = colorScheme.colors.secondaryText;
  const cardColor = colorScheme.colors.card;

  return (
    <View>
      <Input
        key={`${inputkey}_title`}
        label="名称"
        iconName={"pricetags"}
        onChangeText={setData("title")}
        defaultValue={account.title}
        autoFocus
      />
      <Input
        key={`${inputkey}_name`}
        label="用户名"
        iconName={"person"}
        onChangeText={setData("name")}
        defaultValue={account.name}
      />
      <Input
        key={`${inputkey}_phone`}
        label="手机号码"
        iconName={"call"}
        onChangeText={setData("phone")}
        defaultValue={account.phone}
      />
      <Input
        key={`${inputkey}_mail`}
        label="邮箱"
        iconName={"mail"}
        onChangeText={setData("mail")}
        defaultValue={account.mail}
      />
      <Input
        key={`${inputkey}_password`}
        label="密码"
        iconName={"key"}
        onChangeText={setData("password")}
        defaultValue={account.password}
      />
      <View
        style={{
          ...styles.textareaContainer,
          backgroundColor: cardColor,
        }}
      >
        <Text style={{ ...styles.remark, color: secondaryText }}>备注</Text>
        <Textarea
          key={`${inputkey}_remarks`}
          style={{ ...styles.textarea, color: fontColor }}
          onChangeText={setData("remarks")}
          defaultValue={account.remarks}
          maxLength={120}
          // underlineColorAndroid={"transparent"}
        />
      </View>
    </View>
  );
};

const Input = (props: any) => {
  const colorScheme = useTheme();
  const fontColor = colorScheme.colors.text;
  const cardColor = colorScheme.colors.card;
  const primary = colorScheme.colors.primary;

  const color = { color: fontColor };

  return (
    <Fumi
      {...props}
      iconClass={Ionicons}
      iconColor={primary}
      iconSize={20}
      iconWidth={40}
      inputPadding={16}
      style={{ ...styles.input, backgroundColor: cardColor }}
      inputStyle={color}
    />
  );
};

const styles = StyleSheet.create({
  add: {
    flex: 1,
  },
  form: {
    padding: 8,
    flex: 1,
  },
  input: {
    padding: 8,
    borderRadius: 2,
    overflow: "hidden",
    marginBottom: 8,
  },
  textareaContainer: {
    padding: 8,
    borderRadius: 2,
  },
  remark: {
    fontWeight: "bold",
    paddingBottom: 4,
  },
  textarea: {
    textAlignVertical: "top", // hack android
    height: 170,
    fontSize: 14,
  },
});
