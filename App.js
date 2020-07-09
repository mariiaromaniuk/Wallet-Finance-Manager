import { StatusBar } from "expo-status-bar";
import React from "react";
import { Provider } from "react-redux";
import { StyleSheet, Text, View } from "react-native";
import store from "./client/index";
import { SignUp } from "./client/screens/OnBoard/Signup";
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Sign Up">
          <Stack.Screen name="Link Bank" component={Link}/>
          <Stack.Screen name="Log In" component={LogInScreen}/> 
          <Stack.Screen name="Sign Up" component={SignUpScreen} />
          <Stack.Screen name="Details" component={DetailsScreen} />
        </Stack.Navigator>
        <StatusBar style="auto" />
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
