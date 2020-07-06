import React, { Component } from "react";
import { View, Text, TextInput, Button } from "react-native";

export class SignUp extends Component {
  render() {
    return (
      <View>
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
        <Button title="Sign Up"></Button>
      </View>
    );
  }
}

const styles = {
  viewStyle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  inputStyle: {
    height: 40,
    borderColor: "black",
    borderWidth: 1,
  },
};
