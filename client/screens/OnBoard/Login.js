import React, { Component } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { connect } from "react-redux";

export function LogInScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>WALLET</Text>

      <Text>Email: </Text>
      <TextInput style={styles.inputStyle} placeholder="Email"></TextInput>
      <Text>Password: </Text>
      <TextInput style={styles.inputStyle} placeholder="Password"></TextInput>

      <Button
        title="Log In"
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

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(email, password) {
      dispatch(LogInScreen(email, password));
    },
  };
};

export default connect(null, mapDispatch)(LogInScreen);
