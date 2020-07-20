import React, { Component } from "react";
import {
  Container,
  Text,
  Icon,
  Item,
  Form,
  InputGroup,
  Input,
  Button,
  Label,
} from "native-base";
import { StyleSheet, View } from "react-native";

import { connect } from "react-redux";
import { signup } from "../../store/user";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = { firstName: "", lastName: "", email: "", password: "" };
  }

  render() {
    return (
      <Container style={GreetingStyles.container}>
        <View style={GreetingStyles.header}>
          <Text style={GreetingStyles.text_header}>Welcome to Wallet</Text>
        </View>
        <Form style={GreetingStyles.footer}>
          <InputGroup>
            <Icon name="ios-person" />
            <Input
              autoCorrect={false}
              placeholder="First Name"
              onChangeText={(text) => this.setState({ firstName: text })}
            />
          </InputGroup>
          <InputGroup>
            <Icon name="ios-person" />
            <Input
              autoCorrect={false}
              placeholder="Last Name"
              onChangeText={(text) => this.setState({ lastName: text })}
            />
          </InputGroup>
          <InputGroup>
            <Icon name="ios-mail" />
            <Input
              placeholder="EMAIL"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType={"email-address"}
              onChangeText={(text) => this.setState({ email: text })}
            />
          </InputGroup>
          <InputGroup>
            <Icon name="ios-unlock" />
            <Input
              placeholder="PASSWORD"
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry
              onChangeText={(text) => this.setState({ password: text })}
            />
          </InputGroup>
          <Button
            block
            style={{ margin: 20, marginTop: 70 }}
            success
            onPress={() => {
              this.props.handleSubmit(this.state, this.props.navigation);
            }}
          >
            <Text>SIGNUP</Text>
          </Button>
        </Form>
      </Container>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(userInput, navigation) {
      dispatch(signup(userInput, navigation));
    },
  };
};
export default connect(null, mapDispatch)(Signup);

const GreetingStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#003366",
    // backgroundColor: '#7aa8ad',
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
  },
  text_footer: {
    color: "#05375a",
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
  },
  errorMsg: {
    color: "#FF0000",
    fontSize: 14,
  },
  button: {
    alignItems: "center",
    marginTop: 50,
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
