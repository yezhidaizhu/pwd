import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { ListItem } from "react-native-elements";
import uniqolor from "uniqolor";
import Collapsible from "react-native-collapsible";
import { Divider } from "react-native-elements";
import Swipeout from "react-native-swipeout";
import Blank from "./Blank";
import TListItem from "./TListItem";
import Text from "./Text";
import { PWD } from "../screens";

const directionIcon = ["caret-down", "caret-up"];
export default ({
  account,
  colorScheme,
  onDelete,
  onEdit,
}: {
  account: PWD;
  colorScheme: any;
  onDelete: Function;
  onEdit: Function;
}) => {
  const [expanded, setExpanded] = useState(true);
  const { title, name, phone, password, mail, remarks, uId, created } = account;

  const direction = directionIcon[expanded ? 0 : 1];

  const _title = title || name || phone || mail || "无标识";
  const _name = name || phone || mail || "###";
  const leftBorderColor = uniqolor(_title).color;

  const swipeoutBtns = [
    {
      text: "删除",
      type: "delete",
      onPress: () => {
        onDelete(_title, uId);
      },
    },
    {
      text: "修改",
      type: "primary",
      onPress: () => {
        onEdit(uId);
      },
    },
  ];

  const secondaryTextColor = colorScheme.colors.secondaryText;
  const cardColor = colorScheme.colors.card;

  return (
    <Swipeout
      right={swipeoutBtns as any}
      style={{
        ...styles.list,
        backgroundColor: cardColor,
      }}
    >
      <ListItem
        style={{
          ...styles.listItem,
          borderColor: leftBorderColor,
        }}
        containerStyle={{ backgroundColor: cardColor }}
        onPress={() => {
          setExpanded(!expanded);
        }}
      >
        <ListItem.Content>
          <ListItem.Title>
            <Text style={{ ...styles.bold }}>{_title}</Text>
          </ListItem.Title>
          <ListItem.Subtitle>
            <Text style={{ color: secondaryTextColor }}>{_name}</Text>
          </ListItem.Subtitle>
          <View>
            <Text style={{ textAlign: "right", color: leftBorderColor }}>
              {created || "无时间记录"}
            </Text>
          </View>
        </ListItem.Content>
        <ListItem.Chevron
          name={direction}
          size={20}
          type="ionicon"
          color={leftBorderColor}
        />
      </ListItem>
      <Collapsible collapsed={expanded} align="center">
        <View style={{ ...styles.expanded, borderColor: leftBorderColor }}>
          <Divider style={{ backgroundColor: leftBorderColor }} />
          <Blank />
          <TListItem label={"名称"} value={title} />
          <TListItem label={"用户名"} value={name} />
          <TListItem label={"手机号码"} value={phone} />
          <TListItem label={"邮箱"} value={mail} />
          <TListItem label={"密码"} value={password} />
          <View>
            <Text style={styles.label}>备注</Text>
            <View>
              <Text
                style={{ ...styles.remark, borderLeftColor: leftBorderColor }}
              >
                {remarks ? (
                  remarks
                ) : (
                  <Text style={{ color: secondaryTextColor }}>暂无备注</Text>
                )}
              </Text>
            </View>
          </View>
        </View>
      </Collapsible>
    </Swipeout>
  );
};

const styles = StyleSheet.create({
  list: {
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    overflow: "hidden",
    marginBottom: 8,
  },
  listItem: {
    borderLeftWidth: 4,
  },
  bold: {
    fontWeight: "bold",
  },
  expanded: {
    padding: 20,
    paddingTop: 4,
    borderLeftWidth: 4,
  },
  _listItem: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 8,
  },
  label: {
    width: 70,
  },
  value: {
    fontWeight: "bold",
    flex: 1,
  },
  remark: {
    marginVertical: 8,
    paddingHorizontal: 8,
    paddingTop: 4,
    paddingBottom: 16,
    borderLeftWidth: 1,
  },
});
