import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

// 存储数据
export const storeData = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
    return true;
  } catch (e) {
    Alert.alert("保存失败");
    throw new Error(e);
  }
};

// 获取数据
export const getData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (e) {
    Alert.alert("获取失败");
    throw new Error(e);
  }
};
