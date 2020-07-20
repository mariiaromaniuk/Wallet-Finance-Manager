import React, { Component } from "react";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Text,
  Body,
} from "native-base";

import { Dimensions } from "react-native";

export default class Banner extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Card>
        <CardItem header>
          <Text>{this.props.header}</Text>
        </CardItem>
        <CardItem>
          <Body>
            <Text>${this.props.amount}</Text>
          </Body>
        </CardItem>
      </Card>
    );
  }
}
