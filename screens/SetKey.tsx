import React, { useState, useEffect } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Input, Button } from "react-native-elements";
import Text from "../components/Text";
import useTheme from "../hooks/useTheme";
import { getVIKey, isEmptyVIKEY, setVIKey } from "../KEY";
import { Toast } from "../utils/helper";
import {
  clearAllKey,
  ecPwdWithVIKey,
  getDeKeys,
  addEcKeyArr,
} from "../utils/keyHelper";

const keyMinLen = 4; // 最少几位数
export default function setKey({ navigation }: { navigation?: any }) {
  const colorScheme = useTheme();
  const textColor = colorScheme.colors.text;

  const [oldVIKEY, setOldVIKEY] = useState("");
  const [KEY, setKEY] = useState<any>("");
  const [ReKEY, setReKEY] = useState<any>("");
  const [isReKey, setIsReKey] = useState(false); // 是否开始验证密码
  const [eye, setEye] = useState(false); // 是否显示验证密码
  const [oldeye, setOldEye] = useState(false); // 是否显示验证密码
  const [emptyVIKEY, setemptyVIKEY] = useState(false);
  const [loading, setLoading] = useState(false);

  const isFocused = () => setIsReKey(true);
  const onReKey = (v: any) => setReKEY(v);

  // 重置密码，使用一次性覆盖的方式进行更新加密
  const resetKey = async () => {
    // 存储重新加密的密码数组
    const newKeys = [];

    // 获取所有解密密码
    const deKeys = await getDeKeys();

    if (deKeys.length) {
      for (let i = 0; i < deKeys.length; i++) {
        const key = deKeys[i];
        // 加密密码
        const newKey = await ecPwdWithVIKey(key, KEY);
        newKeys[i] = newKey;
      }
      // 清空原来的密码
      await clearAllKey();
      // 追加密码数组
      await addEcKeyArr(newKeys);
    }

    await setVIKey(KEY);

    return true;
  };
  const onSetVIKEY = async () => {
    if (!emptyVIKEY) {
      // 原密码
      const _oldVIKEY = await getVIKey();
      if (_oldVIKEY !== oldVIKEY) {
        Alert.alert("错误", "原密码错误");
        return;
      }
    }

    // 位数检查
    if (KEY.length < keyMinLen) {
      Alert.alert("错误", `加密key至少${keyMinLen}位`);
      return;
    }

    // 重新输入是否一致
    if (KEY !== ReKEY) {
      Alert.alert("错误", "重新输入新加密key不一致");
      return;
    }

    Alert.alert("确认", `你真的真的已经记好此加密key了吗？`, [
      {
        text: "确定",
        onPress: async () => {
          setLoading(true);
          const ret = await resetKey();
          if (ret) {
            Toast("修改完成");
            setLoading(false);
            navigation.reset({
              index: 0,
              routes: [{ name: "Home" }],
            });
            return;
          } else {
            Alert.alert("修改失败");
          }
        },
      },
      {
        text: "取消",
        style: "cancel",
      },
    ]);
  };

  const init = async () => {
    if (!(await isEmptyVIKEY())) {
      setemptyVIKEY(true);
    }
  };

  useEffect(() => {
    init();
  }, []);

  // 密码是否一致
  const isSame = KEY === ReKEY;
  const errorText = isReKey && !isSame ? "key不一致" : "";

  return (
    <View style={styles.content}>
      {!emptyVIKEY && (
        <Input
          label={"原加密key"}
          inputStyle={{ color: textColor }}
          placeholder={`key`}
          secureTextEntry={!oldeye}
          maxLength={24}
          onChangeText={(v) => {
            setOldVIKEY(v);
          }}
          rightIcon={{
            type: "font-awesome",
            name: oldeye ? "eye" : "eye-slash",
            onPress: () => setOldEye(!oldeye),
          }}
          autoFocus
        />
      )}
      <Input
        label={"新加密key"}
        inputStyle={{ color: textColor }}
        placeholder={`至少${keyMinLen}位`}
        secureTextEntry={!eye}
        maxLength={24}
        onChangeText={(v) => {
          setKEY(v);
        }}
        rightIcon={{
          type: "font-awesome",
          name: eye ? "eye" : "eye-slash",
          onPress: () => setEye(!eye),
        }}
        autoFocus
      />
      <Input
        label={"重新输入新加密key"}
        inputStyle={{ color: textColor }}
        placeholder="请重新输入验证"
        secureTextEntry={!eye}
        onChangeText={onReKey}
        maxLength={24}
        onFocus={isFocused}
        errorMessage={errorText}
      />

      <View style={styles.btn}>
        <View style={{ width: "80%" }}>
          <Button
            title="确定"
            type="outline"
            loading={loading}
            onPress={onSetVIKEY}
          />
        </View>
      </View>

      <View>
        <Text style={styles.desc} secondary>
          !!! 1. key 使用于加密每个账号密码，请记住好
        </Text>
        <Text style={styles.desc} secondary>
          !!! 2. 导入导出密码时，导入导出的key相同外，此加密key也要一致
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingTop: 16,
    padding: 8,
  },
  desc: {
    paddingHorizontal: 20,
    paddingTop: 8,
    fontWeight: "bold",
  },
  btn: {
    display: "flex",
    alignItems: "center",
    marginTop: 24,
    marginBottom: 16,
  },
});
