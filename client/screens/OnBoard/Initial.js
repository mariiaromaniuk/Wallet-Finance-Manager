import React, { Component } from "react";
import {
  Container,
  Content,
  Header,
  Body,
  Button,
  Text,
  Thumbnail,
} from "native-base";

class First extends Component {
  render() {
    return (
      <Container>
        <Header
          iosBarStyle
          androidStatusBarColor
          style={{ backgroundColor: "#222831" }}
        >
          <Body
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          ></Body>
        </Header>
        <Content>
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
        </Content>
      </Container>
    );
  }
}

export default First;
