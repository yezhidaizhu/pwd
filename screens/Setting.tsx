import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import useTheme from "../hooks/useTheme";
import { ListItem, BottomSheet } from "react-native-elements";
import Text from "../components/Text";
import Clipboard from "expo-clipboard";
import { exportKeys } from "../utils/keyHelper";

export default function Setting({ navigation }: { navigation: any }) {
  const colorScheme = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const cardColor = colorScheme.colors.card;

  const Options = [
    {
      label: "key设置",
      onClick: () => {
        navigation.navigate("KEY");
      },
    },
    {
      label: "导出密码",
      onClick: async () => {
        const enKeysStr = await exportKeys();
        // 加密
        if (enKeysStr) {
          Clipboard.setString(enKeysStr);
          Alert.alert("确认", "已复制到粘贴板");
        }
      },
    },
    {
      label: "导入密码",
      onClick: () => {
        setIsVisible(true);
      },
    },
  ];

  const list = [
    {
      title: "添加",
      onPress: () => {
        setIsVisible(false);
        navigation.navigate("ImportPwd");
      },
    },
    {
      title: "覆盖",
      onPress: () => {
        setIsVisible(false);
        navigation.navigate("ImportPwd", { isCover: true });
      },
    },
    {
      title: "取消",
      containerStyle: { backgroundColor: "red" },
      titleStyle: { color: "white" },
      onPress: () => setIsVisible(false),
    },
  ];

  return (
    <View>
      {Options?.map((option) => {
        const { label, onClick } = option;
        return (
          <View
            style={{
              ...styles.listItem,
            }}
            key={label}
          >
            <ListItem
              style={styles.item}
              containerStyle={{
                backgroundColor: cardColor,
              }}
              onPress={onClick}
            >
              <ListItem.Content>
                <ListItem.Title>
                  <Text>{label}</Text>
                </ListItem.Title>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
          </View>
        );
      })}

      <BottomSheet
        modalProps={{
          onRequestClose: () => {
            setIsVisible(false);
          },
          animationType: "fade",
        }}
        isVisible={isVisible}
        containerStyle={{
          backgroundColor: "rgba(0.5, 0.25, 0, 0.2)",
          paddingBottom: 24,
        }}
      >
        {list.map((l, i) => (
          <View
            key={i}
            style={{
              ...styles.listItem,
            }}
          >
            <ListItem
              style={styles.item}
              containerStyle={{
                ...l.containerStyle,
                backgroundColor: cardColor,
              }}
              onPress={l.onPress}
            >
              <ListItem.Content>
                <ListItem.Title style={l.titleStyle}>
                  <Text style={styles.label}>{l.title}</Text>
                </ListItem.Title>
              </ListItem.Content>
              {i !== list.length - 1 && <ListItem.Chevron />}
            </ListItem>
          </View>
        ))}
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  listItem: {
    marginVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 4,
    overflow: "hidden",
  },
  item: {
    borderRadius: 4,
    overflow: "hidden",
  },
  label: {
    fontWeight: "bold",
  },
});
