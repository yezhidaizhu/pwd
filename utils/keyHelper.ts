import { unique } from "./helper";
import { decrypt, encrypt, _decrypt, _encrypt } from "../encrypt/passEncrypt";
import { getVIKey } from "../KEY";
import { PWD } from "../screens";
import { storeData, getData } from "./store";
import { STORE_KEYS_KEY } from "../config";
import { Alert } from "react-native";
import dayjs from "dayjs";

//  写在前头，pwdKey其实就是 VIKEY，历史原因，没有改

const KEYNAME = STORE_KEYS_KEY;

// 增加一个密码
export const pushKey = async (account: PWD) => {
  account = await ecPwd(account);
  const uId = await unique();
  const created = dayjs().format("YYYY/MM/DD HH:mm:ss");
  account = { ...account, uId, created };

  const keys = await getKeys();
  keys.push(account);

  const store = JSON.stringify(keys);
  await storeData(KEYNAME, store);
  return true;
};

// 追加加密密码数组，在原加密的密码数组中，加入加密后的密码数组
export const addEcKeyArr = async (ecKeyArr: Array<PWD>) => {
  // 原来的加密数组
  const oldEcKey = await getKeys();
  const newEckey = [...oldEcKey, ...ecKeyArr];
  const store = JSON.stringify(newEckey);
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

// 删除所有密码
export const clearAllKey = async () => {
  const store = JSON.stringify([]);
  const ret = await storeData(KEYNAME, store);
  return ret;
};

// 修改密码
export const editKey = async (account: PWD) => {
  const keys = await getDeKeys();
  // 加密
  account = await ecPwd(account);
  const { uId } = account;

  const keyIndex = keys.findIndex((key) => key.uId === uId);
  if (keyIndex !== -1) {
    keys[keyIndex] = account;
    const store = JSON.stringify(keys);
    await storeData(KEYNAME, store);
  }
  return true;
};

// 根据uId进行获取相应的密码，de: 是否返回解密的，默认是解密的
export const getKeyByUId = async (uId: string, de: boolean = true) => {
  const ecKeys = await getKeys();
  const key = ecKeys?.find((k) => k.uId === uId);
  if (!key) {
    Alert.alert("错误", "无此密码");
    return;
  }
  return de ? await dcPwd(key) : key;
};

// 获取所有密码(加密的)
export const getKeys = async (): Promise<Array<PWD>> => {
  const value = (await getData(KEYNAME)) || "[]";
  const keys = JSON.parse(value);
  return keys;
};

// 获取所有解密的密码
export const getDeKeys = async () => {
  const pwdKey = (await getVIKey()) || "";
  const keys = await getKeys();
  const dkeys = [];
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    try {
      key["password"] = await decrypt(pwdKey, key["password"]);
      dkeys.push(key);
    } catch (e) {
      Alert.alert("解密失败");
    }
  }
  return dkeys;
};

// 加密密码
async function ecPwd(account: PWD) {
  const pwdKey = (await getVIKey()) || "";
  account["password"] = await encrypt(pwdKey, account["password"]);
  return account;
}

// 根据自定义加密密码
export async function ecPwdWithVIKey(account: any, VIKey: string) {
  account["password"] = await encrypt(VIKey, account["password"]);
  return account;
}

// 解密密码
async function dcPwd(account: PWD) {
  try {
    const pwdKey = (await getVIKey()) || "";
    account["password"] = await decrypt(pwdKey, account["password"]);
    return account;
  } catch (e) {
    Alert.alert("解密失败");
  }
}

// 导出所有加密密码，将导出的字符串也进行了加密
// 导出为加密字符串
export const exportKeys = async () => {
  const ecKeys = await getKeys();
  const ecKeysStr = JSON.stringify(ecKeys);
  const VIKEY = (await getVIKey()) || "";
  if (!VIKEY) {
    Alert.alert("错误", "请先设置加密key");
    return false;
  }
  const str = _encrypt(VIKEY, ecKeysStr);
  return str;
};

// 解密导入的加密字符串
export const deImportKeys = async (data: string) => {
  const VIKEY = (await getVIKey()) || "";
  if (!VIKEY) {
    Alert.alert("错误", "请先设置加密key");
    return false;
  }
  try {
    const str = _decrypt(VIKEY, data);
    return str;
  } catch (error) {
    Alert.alert("错误", "解密失败");
    return false;
  }
};
