import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, useColorScheme } from "react-native";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import Setting from "./screens/Setting";
import useTheme from "./hooks/useTheme";
import Home from "./screens/Home";
import Col from "./screens/Col";
import Add from "./screens/Add";

const Stack = createStackNavigator();
const Screen = Stack.Screen;

export default function App() {
  const colorScheme = useTheme();
  const isDarkTheme = colorScheme.dark;
  return (
    <NavigationContainer theme={colorScheme}>
      <Stack.Navigator>
        <Screen
          name="Home"
          options={settingIcon(colorScheme)}
          component={Home}
        />
        <Stack.Screen name="Col" component={Col} />
        <Stack.Screen name="Add" component={Add} />
        <Stack.Screen name="Setting" component={Setting} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  settingIcon: {
    marginRight: 16,
    paddingRight: 16,
    paddingLeft: 16,
  },
});

const settingIcon = (colorScheme: any) => ({
  navigation,
}: {
  navigation: any;
}) => {
  return {
    headerRight: () => (
      <View style={styles.settingIcon}>
        <Ionicons
          onPress={() => navigation.navigate("Setting")}
          name="settings"
          color={colorScheme.colors.text}
          size={24}
        />
      </View>
    ),
  };
};

// {(props) => <ProfileScreen {...props} />}
