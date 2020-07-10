import React, { Component } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { connect } from "react-redux";

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
        onPress={() => navigation.navigate("Welcome")}
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

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(email, password) {
      dispatch(SignUpScreen(email, password));
    },
  };
};

export default connect(null, mapDispatch)(SignUpScreen);
