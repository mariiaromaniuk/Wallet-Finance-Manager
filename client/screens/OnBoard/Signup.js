import React, { Component } from "react";
import { Container, Text, Item, Form, Input, Button, Label } from "native-base";
import { connect } from "react-redux";
import { View, TextInput } from "react-native";
import { withNavigation } from "react-navigation";
import { signup } from "../../store/user";

//   handleOnChange(name, value) {
//     let change = {};
//     switch (name) {
//       case "username":
//         change = { ...this.state, username: value };
//         break;
//       case "email":
//         change = { ...this.state, email: value };
//         break;
//       case "password":
//         change = { ...this.state, password: value };
//         break;
//       case "confirmPassword":
//         change = { ...this.state, confirmPassword: value };
//         break;
//       default:
//         change = { ...this.state };
//     }
//     this.setState(change);
//   }

//   handleOnSignUp() {
//     const email = this.state.email;
//     const password = this.state.password;
//     // Error begins in the line below
//     this.props.handleSubmit(email, password);
//     this.props.navigation.navigate("Link");
//   }

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = { firstName: "", lastName: "", email: "", password: "" };
  }

  render() {
    return (
      <Container>
        <Form>
          <Item floatingLabel>
            <Label>First Name</Label>
            <Input
              onChangeText={(text) => this.setState({ firstName: text })}
            />
          </Item>
          <Item floatingLabel>
            <Label>Last Name</Label>
            <Input onChangeText={(text) => this.setState({ lastName: text })} />
          </Item>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input onChangeText={(text) => this.setState({ email: text })} />
          </Item>
          <Item floatingLabel secureTextEntry>
            <Label>Password</Label>
            <Input onChangeText={(text) => this.setState({ password: text })} />
          </Item>
        </Form>
        <Button
          block
          style={{ margin: 20, marginTop: 40 }}
          success
          onPress={() => {
            this.props.handleSubmit(this.state);

            this.props.navigation.reset({
              index: 0,
              routes: [{ name: "Link" }],
            });
          }}
        >
          <Text>SIGNUP</Text>
        </Button>
      </Container>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(userInput) {
      dispatch(signup(userInput));
    },
  };
};
// const wrappedSignUpScreen = withNavigation(SignUpScreen);
export default connect(null, mapDispatch)(Signup);
