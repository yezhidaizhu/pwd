import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  RefreshControl,
  Alert,
} from "react-native";
import PwdItem from "../components/PwdItem";
import Blank from "../components/Blank";
import FloatBtn from "../components/FloatBtn";
import { PWD } from ".";
import { deleteKey, getDeKeys } from "../utils/store";
import useTheme from "../hooks/useTheme";
import { Toast } from "../utils/helper";

export default function Home({ navigation }: { navigation?: any }) {
  const colorScheme = useTheme();
  const [accounts, setAccounts] = useState<Array<PWD>>();
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await updateAccounts();
    setRefreshing(false);
  }, []);

  const updateAccounts = async () => {
    const keys = await getDeKeys();
    setAccounts(keys);
  };

  useEffect(() => {
    updateAccounts();
  }, []);

  const onDelete = (title: string, uId: string) => {
    Alert.alert(`删除密码 # ${title} #`, `确定要删除此密码吗？`, [
      {
        text: "确定",
        onPress: async () => {
          const ret = await deleteKey(uId);
          if (ret) {
            await onRefresh();
            Toast("删除成功");
          }
        },
      },
      {
        text: "取消",
        style: "cancel",
      },
    ]);
  };

  return (
    <View style={{ flex: 1, overflow: "scroll" }}>
      <FloatBtn navigation={navigation} update={updateAccounts} />
      <ScrollView
        style={styles.list}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {accounts?.map((d: PWD) => {
          const { uId } = d;
          return (
            <PwdItem
              key={uId}
              account={d}
              colorScheme={colorScheme}
              onDelete={onDelete}
            />
          );
        })}
        <Blank h={6} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 8,
    color: "red",
  },
  listItem: {
    marginBottom: 8,
    borderLeftWidth: 4,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    overflow: "hidden",
  },
  bold: {
    fontWeight: "bold",
  },
});
