import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Provider } from "react-redux";
import { StyleSheet, Text, View } from "react-native";
import store from "./client/index";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import SignUpScreen from "./client/screens/OnBoard/Signup";
import LogInScreen from "./client/screens/OnBoard/Login";
import Link from "./client/screens/OnBoard/Link";
const Stack = createStackNavigator();

function DetailsScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Details Screen</Text>
    </View>
  );
}

export default function App() {
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
