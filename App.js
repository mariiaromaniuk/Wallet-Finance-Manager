import React, { Component } from "react";
import { Provider } from "react-redux";
import { StyleSheet, Text, View } from "react-native";
import store from "./client/index";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import SignUpScreen from "./client/screens/OnBoard/Signup";
import LogInScreen from "./client/screens/OnBoard/Login";
import Link from "./client/screens/OnBoard/Link";
const Stack = createStackNavigator();

export default class App extends Component {
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
            title: "Link your bank to Wallet",
          }}
        />
      </Stack.Navigator>
    );
  };

  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Sign Up">
            <Stack.Screen name="Link Bank" component={Link} />
            <Stack.Screen name="Sign Up" component={SignUpScreen} />
            {/*<Stack.Screen name="Log In" component={LogInScreen}/> 
          <Stack.Screen name="Details" component={DetailsScreen} /> */}
            <Stack.Screen name="Log In" component={LogInScreen} />
          </Stack.Navigator>
          {/* <StatusBar style="auto" /> */}
        </NavigationContainer>
      </Provider>
    );
  }
}
