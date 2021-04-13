import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Button } from "react-native-elements";
import Blank from "../components/Blank";
import { editKey, getKeyByUId } from "../utils/keyHelper";
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
  const [inputkey, setInputkey] = useState("inputKey"); // 用于刷新默认值

  const setData = (field: string) => (v: any) =>
    setAccount({ ...account, [field]: v });

  const submit = async () => {
    setloading(true);
    const ret = await editKey({ ...account });
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

  const init = async () => {
    const uId = route.params.uId;
    const key = await getKeyByUId(uId);
    if (key) {
      setAccount({ ...key });
      setInputkey("inputNewKey");
    }
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <View style={styles.add}>
      <ScrollView style={styles.form}>
        <EditPwd setData={setData} account={account} inputkey={inputkey} />
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
