import React, { Component } from "react";
import { Container, Button, Text } from "native-base";

class First extends Component {
  render() {
    return (
      <Container>
        <Button
          block
          style={{ margin: 20, marginTop: 150 }}
          primary
          onPress={() => {
            this.props.navigation.navigate("Login");
          }}
        >
          <Text>LOGIN</Text>
        </Button>
        <Button
          block
          style={{ margin: 20, marginTop: 20 }}
          success
          onPress={() => {
            this.props.navigation.navigate("Signup");
          }}
        >
          <Text>SIGNUP</Text>
        </Button>
      </Container>
    );
  }
}

export default First;
