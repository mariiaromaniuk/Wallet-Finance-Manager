import React, {Component} from "react";
import { Provider } from "react-redux";
import { StyleSheet, Text, View } from "react-native";
import store from "./client/index";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  Signup,
  Login,
  Link,
  Initial
} from './client/screens'
const Stack = createStackNavigator();

export default class App extends Component {
  createHomeStack =() =>{
    return(
      <Stack.Navigator>
        <Stack.Screen
        name='Initial'
        component={Initial}
        options={
          {
            title: 'Welcome'
          }
        }
        />
        <Stack.Screen
        name='Signup'
        component={Signup}
        options={
          {
            title: 'Signup'
          }
        }
        />
        <Stack.Screen
        name='Login'
        component={Login}
        options={
          {
            title: 'Login'
          }
        }
        />
        <Stack.Screen
        name='Link'
        component={Link}
        options={
          {
            title: 'Link your bank to Wallet'
          }
        }
        />
      </Stack.Navigator>
    )
  }


  render(){
    return(
      <Provider store={store}>
      <NavigationContainer>
        {this.createHomeStack()}
      </NavigationContainer>
    </Provider>
    )
  }
}
