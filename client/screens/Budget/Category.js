import React from "react";
import { connect } from "react-redux";
import {
  Container,
  Header,
  Content,
  Body,
  Left,
  Right,
  Text,
  Icon,
  Button,
  Card,
  CardItem,
} from "native-base";

const Category = (props) => {
  let data = props.navigation.dangerouslyGetState().routes;
  let categoryName = data[data.length - 1].params.name;
  let categoryTransactions = props.transactions.filter((transaction) => {
    let data = transaction.category1.toLowerCase();
    let dataToMatch = categoryName.toLowerCase();
    if (data === dataToMatch) {
      return transaction;
    }
  });

  return (
    <Container>
      <Header>
        <Left>
          <Button
            transparent
            style={{ marginLeft: 10 }}
            onPress={() => props.navigation.goBack()}
          >
            <Icon name="arrow-back" style={{ color: "red", fontSize: 25 }} />
          </Button>
        </Left>
        <Body>
          <Text style={{ fontWeight: "bold" }}>{categoryName}</Text>
        </Body>
        <Right />
      </Header>
      <Content>
        {categoryTransactions.map((trans) => {
          return (
            <Card key={trans.id} style={{ borderRadius: 8 }}>
              <CardItem style={{ borderRadius: 8 }}>
                <Body>
                  <Text style={{ fontWeight: "500", borderRadius: 20 }}>
                    {trans.name}
                  </Text>
                  <Text style={{ alignSelf: "flex-end" }}>
                    <Text>{trans.date}</Text>
                  </Text>
                  <Text style={{ color: "red", fontWeight: "bold" }}>
                    {trans.amount}
                  </Text>
                </Body>
              </CardItem>
            </Card>
          );
        })}
      </Content>
    </Container>
  );
};

const mapState = (state) => {
  return {
    transactions: state.transactions,
  };
};
export default connect(mapState)(Category);
