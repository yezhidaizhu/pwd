import { ToastAndroid } from "react-native";
import { v4 as uuid4 } from "uuid";

// 随机产生唯一字符串
export const unique = (num: number = 16) => {
  const ukey = uuid4().slice(-num);
  return ukey;
};

export const Toast = (title: string) => {
  ToastAndroid.showWithGravityAndOffset(
    title,
    ToastAndroid.SHORT,
    ToastAndroid.BOTTOM,
    0,
    200
  );
};
