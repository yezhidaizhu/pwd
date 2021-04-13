import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  RefreshControl,
  Alert,
  ImageBackground,
} from "react-native";
import PwdItem from "../components/PwdItem";
import Blank from "../components/Blank";
import FloatBtn from "../components/FloatBtn";
import { PWD } from ".";
import { deleteKey, getDeKeys, getKeys } from "../utils/keyHelper";
import useTheme from "../hooks/useTheme";
import { Toast } from "../utils/helper";
import EmptyVIKey from "../components/EmptyVIKey";
import { isEmptyVIKEY } from "../KEY";
import EmptyKeyAccount from "../components/EmptyKeyAccount";

export default function Home({ navigation }: { navigation?: any }) {
  const colorScheme = useTheme();
  const [accounts, setAccounts] = useState<Array<PWD>>();
  const [refreshing, setRefreshing] = React.useState(false);

  const [emptyVIKEY, setEmptyVIKEY] = useState(false);
  const [emptyAccount, setEmptyAccount] = useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await updateAccounts();
    setRefreshing(false);
  }, []);

  const onRefreshThenDelete = React.useCallback(async () => {
    await updateAccounts();
  }, []);

  const updateAccounts = async () => {
    const keys = await getDeKeys();
    setAccounts(keys);
  };

  const routerToSetKey = () => {
    navigation.navigate("KEY");
  };
  const routerToAddKey = () => {
    navigation.navigate("Add");
  };

  const init = async () => {
    if (!(await isEmptyVIKEY())) {
      setEmptyVIKEY(true);
      return;
    }
    if (!(await getKeys()).length) {
      setEmptyAccount(true);
      return;
    }
    updateAccounts();
  };

  useEffect(() => {
    init();
  }, []);

  const onDelete = (title: string, uId: string) => {
    Alert.alert(`删除密码 # ${title} #`, `确定要删除此密码吗？`, [
      {
        text: "确定",
        onPress: async () => {
          const ret = await deleteKey(uId);
          if (ret) {
            await onRefreshThenDelete();
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

  const onEdit = (uId: string) => {
    navigation.navigate("Edit", { uId });
  };

  return (
    // <ImageBackground style={{ flex: 1 }} source={require("./bg.png")}>
    <View style={{ flex: 1, overflow: "scroll" }}>
      <EmptyVIKey hidden={emptyVIKEY} onPress={routerToSetKey} />
      <EmptyKeyAccount hidden={emptyAccount} onPress={routerToAddKey} />
      {!emptyVIKEY && !emptyAccount && <FloatBtn navigation={navigation} />}
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
              onEdit={onEdit}
            />
          );
        })}
        <Blank h={6} />
      </ScrollView>
    </View>
    // </ImageBackground>
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
