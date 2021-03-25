import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import { Input as SInput, SocialIcon, Button } from "react-native-elements";
import { Fumi } from "react-native-textinput-effects";
import Ionicons from "react-native-vector-icons/Ionicons";
import Blank from "../components/Blank";
import useTheme from "../hooks/useTheme";
import Textarea from "react-native-textarea";
import { getDeKeys, getKeys, pushKey } from "../utils/store";
import EditPwd from "../components/EditPwd";
import { PWD } from ".";
import { Toast } from "../utils/helper";

export default ({ navigation, route }: { navigation?: any; route?: any }) => {
  const [loading, setloading] = useState(false);
  const [account, setAccount] = useState<PWD>({
    title: "",
    name: "",
    phone: "",
    mail: "",
    password: "",
    remarks: "",
  });

  const setData = (field: string) => (v: any) =>
    setAccount({ ...account, [field]: v });

  const submit = async () => {
    setloading(true);
    const ret = await pushKey({ ...account });
    if (ret) {
      Toast("保存成功");
      setTimeout(() => {
        route.params.update();
        navigation.goBack();
        setloading(false);
      }, 1500);
    }
  };

  return (
    <View style={styles.add}>
      <ScrollView style={styles.form}>
        <EditPwd setData={setData} account={account} />
        <Blank h={2} />
        <Button onPress={submit} title="保存" raised loading={loading} />
        <Blank />
      </ScrollView>
    </View>
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
});
