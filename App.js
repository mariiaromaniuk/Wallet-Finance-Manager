import React, { Component } from "react";
import { Provider } from "react-redux";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import store from "./client/index";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  Signup,
  Login,
  Link,
  Initial,
  DummyPage,
  Dashboard,
} from "./client/screens";
const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();

export default class App extends Component {
  createTabs = () => {
    return (
      <Tabs.Navigator
        tabBarOptions={{
          activeTintColor: "red",
        }}
      >
        <Tabs.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            tabBarLabel: "Dashboard",
            tabBarIcon: ({ color, size }) => {
              return (
                <MaterialCommunityIcons name="home" size={size} color={color} />
              );
            },
          }}
        />
        <Tabs.Screen
          name="Dummy2"
          component={DummyPage}
          options={{
            tabBarLabel: "Budgets",
            tabBarIcon: ({ color, size }) => {
              return (
                <FontAwesome5 name="piggy-bank" size={size} color={color} />
              );
            },
          }}
        />
        <Tabs.Screen
          name="Dummy3"
          component={DummyPage}
          options={{
            tabBarLabel: "Profile",
            tabBarIcon: ({ color, size }) => {
              return (
                <MaterialCommunityIcons
                  name="account"
                  size={size}
                  color={color}
                />
              );
            },
          }}
        />
      </Tabs.Navigator>
    );
  };

  createHomeStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Initial"
          component={Initial}
          options={{
            title: "Welcome",
          }}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{
            title: "Signup",
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            title: "Login",
          }}
        />
        <Stack.Screen
          name="Link"
          component={Link}
          options={{
            headerLeft: () => {},
          }}
        />
        <Stack.Screen
          name="Dashboard"
          component={this.createTabs}
          options={{
            headerLeft: () => {},
          }}
        />
      </Stack.Navigator>
    );
  };

  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>{this.createHomeStack()}</NavigationContainer>
      </Provider>
    );
  }
}
