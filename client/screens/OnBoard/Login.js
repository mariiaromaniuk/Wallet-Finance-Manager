import React, { Component } from "react";
import {
  Container,
  Text,
  InputGroup,
  Icon,
  Form,
  Input,
  Button,
} from "native-base";
import { connect } from "react-redux";
import { login } from "../../store/user";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "" };
  }
  render() {
    return (
      <Container>
        <Form>
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
              secureTextEntry={true}
              onChangeText={(text) => this.setState({ password: text })}
            />
          </InputGroup>
        </Form>
        <Button
          block
          style={{ margin: 20, marginTop: 40 }}
          primary
          onPress={() =>
            this.props.handleSubmit(
              this.state.email,
              this.state.password,
              this.props.navigation
            )
          }
        >
          <Text>LOGIN</Text>
        </Button>
      </Container>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(email, password, navigate) {
      dispatch(login(email, password, navigate));
    },
  };
};

export default connect(null, mapDispatch)(Login);
