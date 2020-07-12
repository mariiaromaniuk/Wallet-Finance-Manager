import React, { Component } from "react";
import { Container, Content, Button, Text } from "native-base";

class DummyPage extends Component {
  render() {
    return (
      <Container>
        <Content>
          <Button block style={{ margin: 20, marginTop: 20 }} danger>
            <Text>THIS IS A DUMMY COMPONENT</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

export default DummyPage;
