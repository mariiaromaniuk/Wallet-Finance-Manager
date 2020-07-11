import React, { Component } from "react";
import { Container, Text, Item,InputGroup, Icon, Form, Input, Button, Label } from "native-base";
import { connect } from "react-redux";

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
           <Icon name='ios-mail' />
          <Input placeholder='EMAIL' keyboardType={"email-address"} onChangeText={(text) => this.setState({ email: text })}  />
        </InputGroup>
        <InputGroup>
          <Icon name='ios-unlock' />
          <Input placeholder='PASSWORD' secureTextEntry={true} onChangeText={(text) => this.setState({ password: text })}/>
         </InputGroup>
        </Form>
        <Button
          block
          style={{ margin: 20, marginTop: 40 }}
          primary
          onPress={this.props.handleSubmit(
            this.state.email,
            this.state.password
          )}
        >
          <Text>LOGIN</Text>
        </Button>
      </Container>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(email, password) {
      // dispatch(LogInScreen(email, password));
    },
  };
};

export default connect(null, mapDispatch)(Login);
