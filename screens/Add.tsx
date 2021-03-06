import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Button } from "react-native-elements";
import Blank from "../components/Blank";
import { pushKey } from "../utils/keyHelper";
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
        navigation.reset({
          index: 0,
          routes: [{ name: "Home" }],
        });
        setloading(false);
      }, 1500);
    }
  };

  return (
    <View style={styles.add}>
      <ScrollView style={styles.form}>
        <EditPwd setData={setData} account={account} />
        <Blank h={2} />
        <Button
          onPress={submit}
          type="outline"
          title="保存"
          loading={loading}
        />
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
