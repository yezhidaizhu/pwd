import CryptoJS from "react-native-crypto-js";
import { unique } from "../utils/helper";

export async function encrypt(password: string, data: any) {
  const key = pkey(password);
  const ciphertext = await CryptoJS.AES.encrypt(data, key).toString();
  const v = ec(key, ciphertext);
  return v;
}

export async function decrypt(password: string, encrypted: any) {
  const key = pkey(password);
  encrypted = dc(key, encrypted);
  let bytes = await CryptoJS.AES.decrypt(encrypted, key);
  let decrypted = bytes.toString(CryptoJS.enc.Utf8);
  return decrypted;
}

// 填充密码，32位
const pkey = (password: string) => {
  const _key = "4921-b9e4-fde9b2471491";
  return password + _key.slice(password.length);
};

// 密文再次简单加密，根据密码第一个字符，插入addLong个字符
const addLong = 4;
const ec = (key: string, ciphertext: string) => {
  const firstCharCode = (key.charCodeAt(0) % 5) + 1;
  const pre = ciphertext.slice(0, ciphertext.length - firstCharCode);
  const end = ciphertext.slice(-firstCharCode);
  const random = unique(addLong);
  const newStr = pre + random + end;
  return newStr;
};
// 简单解密
const dc = (key: string, ciphertext: string) => {
  const firstCharCode = (key.charCodeAt(0) % 5) + 1;
  const pre = ciphertext.slice(0, ciphertext.length - firstCharCode - addLong);
  const end = ciphertext.slice(-firstCharCode);
  const newStr = pre + end;
  return newStr;
};
