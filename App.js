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
  ResetPassword,
  Login,
  Link,
  Initial,
  DummyPage,
  Dashboard,
  Profile,
  Budget,
  BudgetSetup,
  EditCategories,
  Spending,
  Settings,
} from "./client/screens";
import { Root } from "native-base";
const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();

export default class App extends Component {
  createTabs = () => {
    return (
      <Tabs.Navigator
        tabBarOptions={{
          activeTintColor: "#eb6383",
          style: {
            backgroundColor: "#222831",
          },
        }}
      >
        <Tabs.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            tabBarLabel: "Dashboard",
            tabBarIcon: ({ color }) => {
              return (
                <MaterialCommunityIcons name="home" size={30} color={color} />
              );
            },
          }}
        />
        <Tabs.Screen
          name="Budget"
          component={Budget}
          options={{
            tabBarLabel: "Budget",
            tabBarIcon: ({ color, size }) => {
              return (
                <FontAwesome5 name="piggy-bank" size={size} color={color} />
              );
            },
          }}
        />
        <Tabs.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarLabel: "Profile",
            tabBarIcon: ({ color }) => {
              return (
                <MaterialCommunityIcons
                  name="account"
                  size={30}
                  color={color}
                />
              );
            },
          }}
        />
        <Tabs.Screen
          name="Transactions"
          component={Spending}
          options={{
            tabBarLabel: "Transactions",
            tabBarIcon: ({ color, size }) => {
              return (
                <FontAwesome5 name="chart-area" size={size} color={color} />
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
          options={{ headerShown: false, headerLeft: () => {} }}
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
          name="Settings"
          component={Settings}
          options={{
            headerShown: false,
            headerLeft: () => {},
          }}
        />
        <Stack.Screen
          name="PasswordReset"
          component={ResetPassword}
          options={{
            headerShown: false,
            headerLeft: () => {},
          }}
        />
        <Stack.Screen
          name="Dashboard"
          component={this.createTabs}
          options={{
            headerShown: false,
            headerLeft: () => {},
          }}
        />
        <Stack.Screen
          name="Transactions"
          component={Spending}
          options={{
            title: "Transactions",
          }}
        />
        <Stack.Screen
          name="Budget"
          component={Budget}
          options={{
            title: "Budget",
          }}
        />
        <Stack.Screen
          name="BudgetSetup"
          component={BudgetSetup}
          options={{
            title: "Budget Setup",
          }}
        />
        <Stack.Screen
          name="EditCategories"
          component={EditCategories}
          options={{
            title: "Edit Categories",
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
