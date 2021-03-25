import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { unique } from "./helper";
import { decrypt, encrypt } from "../encrypt/passEncrypt";
import { getPwdKey } from "../config/pwdKey";
import { PWD } from "../screens";

const KEYNAME = "UKEY";

// 增加一个密码
export const pushKey = async (account: PWD) => {
  account = await ecPwd(account);
  const uId = await unique();
  account = { ...account, uId };

  const keys = await getKeys();
  keys.push(account);

  const store = JSON.stringify(keys);
  await storeData(KEYNAME, store);
  return true;
};

// 删除密码
export const deleteKey = async (uId: string) => {
  const keys = await getKeys();
  const newKeys = keys?.filter((key: any) => key.uId !== uId);
  const store = JSON.stringify(newKeys);
  await storeData(KEYNAME, store);
  return true;
};

// 修改密码
export const editKey = async (account: PWD) => {
  const keys = await getKeys();

  account = await ecPwd(account);
  const { uId } = account;

  const keyIndex = keys.findIndex((key) => key.uId === uId);
  if (keyIndex !== -1) {
    keys[keyIndex] = account;
  }
};

// 获取所有密码(加密的)
export const getKeys = async (): Promise<Array<PWD>> => {
  const value = (await getData(KEYNAME)) || "[]";
  const keys = JSON.parse(value);
  return keys;
};

// 获取所有解密的密码
export const getDeKeys = async () => {
  const pwdKey = getPwdKey();
  const keys = await getKeys();
  const dkeys = [];
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    key["password"] = await decrypt(pwdKey, key["password"]);
    dkeys.push(key);
  }
  return dkeys;
};

// 加密密码
async function ecPwd(account: any) {
  const pwdKey = getPwdKey();
  account["password"] = await encrypt(pwdKey, account["password"]);
  return account;
}

// 解密密码
async function dcPwd(account: any) {
  const pwdKey = getPwdKey();
  account["password"] = await decrypt(pwdKey, account["password"]);
  return account;
}

// 存储数据
const storeData = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    Alert.alert("保存失败");
  }
};

// 获取数据
const getData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (e) {
    Alert.alert("获取失败");
  }
  return "";
};
