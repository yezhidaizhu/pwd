import React, { useState, useEffect } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Button } from "react-native-elements";
import Textarea from "react-native-textarea";
import Text from "../components/Text";
import { _decrypt } from "../encrypt/passEncrypt";
import useTheme from "../hooks/useTheme";
import { Toast, unique } from "../utils/helper";
import { addEcKeyArr, clearAllKey, deImportKeys } from "../utils/keyHelper";
import Clipboard from "expo-clipboard";

export default ({ navigation, route }: { navigation?: any; route?: any }) => {
  const colorScheme = useTheme();
  const [data, setData] = useState("");
  const [loading, setloading] = useState(false);
  const [isCover, setIsCover] = useState(true);
  const [defaultValue, setDefaultValue] = useState("");

  const fontColor = colorScheme.colors.text;
  const cardColor = colorScheme.colors.card;

  const setString = (v: string) => {
    setData(v);
  };

  // 追加记得改变uId，否则会出现同样的uId，
  // 没有测试可以承受多少个密码
  const onAdd = async () => {
    setloading(true);
    const ret = await deImportKeys(data);
    if (ret) {
      try {
        let newKeys = JSON.parse(ret);
        if (typeof newKeys === typeof []) {
          newKeys = newKeys?.map((key: any) => {
            key["uId"] = unique();
            return key;
          });
          await addEcKeyArr(newKeys);
          setloading(false);
          navigation.reset({
            index: 0,
            routes: [{ name: "Home" }],
          });
          Toast("添加成功");
          return;
        }
      } catch (e) {}
    }
    Alert.alert("错误", "解密失败，加密key或密文出现错误");
    setloading(false);
  };
  // 覆盖数据
  const onCover = async () => {
    setloading(true);
    const ret = await deImportKeys(data);
    if (ret) {
      try {
        let newKeys = JSON.parse(ret);
        if (typeof newKeys === typeof []) {
          await clearAllKey(); // 清除密码
          await addEcKeyArr(newKeys);
          setloading(false);
          navigation.reset({
            index: 0,
            routes: [{ name: "Home" }],
          });
          Toast("覆盖成功");
          return;
        }
      } catch (e) {}
    }
    Alert.alert("错误", "解密失败，加密key或密文出现错误");
    setloading(false);
  };

  // 粘贴
  const onClipboard = async () => {
    const cliData = await Clipboard.getStringAsync();
    setData(cliData);
    setDefaultValue(cliData);
  };

  useEffect(() => {
    const isCover = route?.params?.isCover;
    setIsCover(!!isCover);
  }, []);

  const desc = isCover
    ? "解密后的数据将会覆盖本地数据数据，本地数据将清除，请谨慎操作！"
    : "解密后的数据将会在本地数据后面添加。";
  const btnTitle = isCover ? "覆盖" : "添加";

  const onSub = () => {
    Alert.alert(`确定`, `${desc}\n确定要${btnTitle}吗？`, [
      {
        text: "确定",
        onPress: async () => {
          isCover ? onCover() : onAdd();
        },
      },
      {
        text: "取消",
        style: "cancel",
      },
    ]);
  };

  return (
    <View style={styles.body}>
      <View
        style={{
          ...styles.container,
          backgroundColor: cardColor,
        }}
      >
        <Textarea
          containerStyle={styles.textareaContainer}
          style={{ ...styles.textarea, color: fontColor }}
          onChangeText={setString}
          defaultValue={defaultValue}
          placeholder={"请输入加密的文字"}
          placeholderTextColor={"#c7c7c7"}
          underlineColorAndroid={"transparent"}
        />
        <Text secondary>{desc}</Text>
      </View>
      <View>
        <Button onPress={onClipboard} type="outline" title={"输入粘贴板内容"} />
        <View style={{ height: 16 }}></View>
        <Button
          onPress={onSub}
          type="outline"
          title={btnTitle}
          loading={loading}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    padding: 8,
    height: "90%",
    justifyContent: "space-between",
  },
  container: {
    padding: 8,
    borderRadius: 2,
    height: "60%",
  },
  textareaContainer: {
    flex: 1,
  },
  textarea: {
    textAlignVertical: "top", // hack android
    fontSize: 18,
  },
});
