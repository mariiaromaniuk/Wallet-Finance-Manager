import { StatusBar } from "expo-status-bar";
import React from "react";
import { Provider } from "react-redux";
import { StyleSheet, Text, View } from "react-native";
import store from "./client/index";
import { SignUp } from "./client/screens/OnBoard/Signup";
export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Text>WALLET</Text>
        <SignUp></SignUp>
        <StatusBar style="auto" />
      </View>
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
