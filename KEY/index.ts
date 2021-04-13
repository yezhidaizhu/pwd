import { STORE_KEYS_VIKEY } from "../config";
import { getData, storeData } from "../utils/store";

const store_VIKEY = STORE_KEYS_VIKEY;

export const isEmptyVIKEY = async () => {
  const key = await getVIKey();
  return !!key;
};

export const getVIKey = async () => {
  const pwdKey = getData(store_VIKEY);
  return pwdKey;
};

export const setVIKey = async (v: string): Promise<boolean> => {
  const pwdKey = await storeData(store_VIKEY, v);
  return pwdKey;
};
