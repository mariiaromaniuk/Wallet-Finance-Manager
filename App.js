import React, { Component } from "react";
import { Provider } from "react-redux";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import store from "./client/index";
import {
  NavigationContainer,
  mapNavigationStateParamsToProps,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  Signup,
  ResetPassword,
  Category,
  Login,
  Link,
  Initial,
  Dashboard,
  Profile,
  EditCategories,
  Spending,
  Budget,
  BudgetSetup,
} from "./client/screens";
import LoanEntry from "./client/screens/Calculator/LoanEntry";
import Results from './client/screens/Calculator/Results.js'

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
          component={this.budgetStack}
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
      </Stack.Navigator>
    );
  };

  budgetStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Budget"
          component={Budget}
          options={{
            headerShown: false,
            title: "Budget Setup",
            headerLeft: () => {},
          }}
        />
        <Stack.Screen
          name="BudgetSetup"
          component={BudgetSetup}
          options={{
            headerShown: false,
            title: "Budget Setup",
            headerLeft: () => {},
          }}
        />
        <Stack.Screen
          name="Category"
          component={Category}
          options={{
            headerShown: false,
            title: "Budget Setup",
            headerLeft: () => {},
          }}
        />
        <Stack.Screen
          name="EditCategories"
          component={EditCategories}
          options={{
            headerShown: false,
            title: "Edit Categories",
            headerLeft: () => {},
          }}
        />
        <Stack.Screen
          name="Calculator"
          component={LoanEntry}
          options={{
            headerShown: false,
            title: "Loan Calculator",
            headerLeft: () => {},
          }}
        />
        <Stack.Screen
          name="Results"
          component={Results}
          options={{
            headerShown: false,
            title: "Results",
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
