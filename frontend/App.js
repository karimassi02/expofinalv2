import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginScreen from "./Screens/LoginScreen";
import SignupScreen from "./Screens/SignupScreen";
import HomeNav from "./Screens/Home";
import ChatListPage from "./Screens/ChatList";
import Chatroom from "./Screens/ChatRoom";
import ProfileScreen from "./Screens/Profile";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Signup"
          component={SignupScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="home"
          component={HomeNav}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="chatList"
          component={ChatListPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Chatroom"
          component={Chatroom}
          options={({ route }) => ({ title: route.params.groupName })}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
