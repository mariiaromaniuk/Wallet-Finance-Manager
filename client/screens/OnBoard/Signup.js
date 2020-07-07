import React, { Component } from "react";
import { View, Text, TextInput, Button } from "react-native";

export function SignUpScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>WALLET</Text>

      <Text>Username: </Text>
      <TextInput style={styles.inputStyle} placeholder="Username"></TextInput>
      <Text>Email: </Text>
      <TextInput style={styles.inputStyle} placeholder="Email"></TextInput>
      <Text>Password: </Text>
      <TextInput style={styles.inputStyle} placeholder="Password"></TextInput>
      <Text>Confirm Password: </Text>
      <TextInput
        style={styles.inputStyle}
        placeholder="Confirm Password"
      ></TextInput>
      <Button
        title="Sign Up"
        onPress={() => navigation.navigate("Details")}
      ></Button>
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  inputStyle: {
    height: 40,
    borderColor: "black",
    borderWidth: 1,
  },
};
