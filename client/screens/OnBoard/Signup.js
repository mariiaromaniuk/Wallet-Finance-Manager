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
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnSignUp = this.handleOnSignUp.bind(this);
  }

  handleOnChange(name, value) {
    let change = {};
    switch (name) {
      case "username":
        change = { ...this.state, username: value };
        break;
      case "email":
        change = { ...this.state, email: value };
        break;
      case "password":
        change = { ...this.state, password: value };
        break;
      case "confirmPassword":
        change = { ...this.state, confirmPassword: value };
        break;
      default:
        change = { ...this.state };
    }
    this.setState(change);
  }

  handleOnSignUp() {
    const email = this.state.email;
    const password = this.state.password;
    // Error begins in the line below
    this.props.handleSubmit(email, password);
    this.props.navigation.navigate("Link Bank");
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
          onChangeText={this.handleOnChange}
        ></TextInputComponent>
        <Text>Email: </Text>
        <TextInputComponent
          style={styles.inputStyle}
          name="email"
          value={this.state.value}
          placeholder="Email"
          onChangeText={this.handleOnChange}
        ></TextInputComponent>
        <Text>Password: </Text>
        <TextInputComponent
          style={styles.inputStyle}
          name="password"
          value={this.state.value}
          placeholder="Password"
          onChangeText={this.handleOnChange}
        ></TextInputComponent>
        <Text>Confirm Password: </Text>
        <TextInputComponent
          style={styles.inputStyle}
          name="confirmPassword"
          value={this.state.value}
          placeholder="Confirm Password"
          onChangeText={this.handleOnChange}
        ></TextInputComponent>
        <Button title="Sign Up" onPress={() => this.handleOnSignUp()}></Button>
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
// const wrappedSignUpScreen = withNavigation(SignUpScreen);
export default connect(null, mapDispatch)(SignUpScreen);
