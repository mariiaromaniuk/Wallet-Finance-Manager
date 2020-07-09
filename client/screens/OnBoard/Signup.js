import React, { Component } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";
import { signup } from "../../store/user";

const TextInputComponent = ({ value, onChangeText, name, ...props }) => (
  <TextInput
    value={value}
    onChangeText={(value) => onChangeText(name, value)} //... Bind the name here
    {...props}
  />
);

class SignUpScreen extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      email: "",
      password: "",
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>WALLET</Text>

        <Text>Username: </Text>
        <TextInputComponent
          style={styles.inputStyle}
          name="username"
          value={this.state.value}
          placeholder="Username"
        ></TextInputComponent>
        <Text>Email: </Text>
        <TextInputComponent
          style={styles.inputStyle}
          name="email"
          value={this.state.value}
          placeholder="Email"
        ></TextInputComponent>
        <Text>Password: </Text>
        <TextInputComponent
          style={styles.inputStyle}
          name="password"
          value={this.state.value}
          placeholder="Password"
        ></TextInputComponent>
        <Text>Confirm Password: </Text>
        <TextInputComponent
          style={styles.inputStyle}
          name="confirmPassword"
          value={this.state.value}
          placeholder="Confirm Password"
        ></TextInputComponent>
        <Button
          title="Sign Up"
          onPress={() => this.props.navigation.navigate("Log In")}
        ></Button>
      </View>
    );
  }
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
      dispatch(signup(email, password));
    },
  };
};
const wrappedSignUpScreen = withNavigation(SignUpScreen);
export default connect(null, mapDispatch)(wrappedSignUpScreen);
