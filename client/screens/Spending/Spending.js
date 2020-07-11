import React from "react";
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Thumbnail,
  Text,
  Left,
  Body,
  Right,
} from "native-base";
import { View, FlatList, Button } from "react-native";
import { SingleTransaction } from "./SingleTransaction";

import { connect } from "react-redux";
// import { fetchTransactions } from "../../store/spending";
import axios from "axios";
import { server } from "../../index";

const netCash = 30000;
const data = [
  {
    id: 1,
    name: "Google Payroll",
    amount: -2200,
    date: "2018-05-11",
    accountId: "joyceChaseAccount",
    category: null,
    included: true,
    createdAt: "2020-07-08T22:25:59.594Z",
    updatedAt: "2020-07-08T22:25:59.594Z",
    userId: 1,
  },
  {
    id: 2,
    name: "Google Payroll",
    amount: -2200,
    date: "2018-05-25",
    accountId: "joyceChaseAccount",
    category: null,
    included: true,
    createdAt: "2020-07-08T22:25:59.594Z",
    updatedAt: "2020-07-08T22:25:59.594Z",
    userId: 1,
  },
  {
    id: 3,
    name: "Google Payroll",
    amount: -2200,
    date: "2018-06-08",
    accountId: "joyceChaseAccount",
    category: null,
    included: true,
    createdAt: "2020-07-08T22:25:59.594Z",
    updatedAt: "2020-07-08T22:25:59.594Z",
    userId: 1,
  },
  {
    id: 4,
    name: "Google Payroll",
    amount: -2200,
    date: "2018-06-22",
    accountId: "joyceChaseAccount",
    category: null,
    included: true,
    createdAt: "2020-07-08T22:25:59.594Z",
    updatedAt: "2020-07-08T22:25:59.594Z",
    userId: 1,
  },
  {
    id: 5,
    name: "Google Payroll",
    amount: -500,
    date: "2018-05-11",
    accountId: "joyceChaseSaving",
    category: null,
    included: true,
    createdAt: "2020-07-08T22:25:59.595Z",
    updatedAt: "2020-07-08T22:25:59.595Z",
    userId: 1,
  },
  {
    id: 6,
    name: "Google Payroll",
    amount: -500,
    date: "2018-05-11",
    accountId: "joyceChaseSaving",
    category: null,
    included: true,
    createdAt: "2020-07-08T22:25:59.595Z",
    updatedAt: "2020-07-08T22:25:59.595Z",
    userId: 1,
  },
  {
    id: 7,
    name: "Google Payroll",
    amount: -500,
    date: "2018-05-11",
    accountId: "joyceChaseSaving",
    category: null,
    included: true,
    createdAt: "2020-07-08T22:25:59.595Z",
    updatedAt: "2020-07-08T22:25:59.595Z",
    userId: 1,
  },
  {
    id: 8,
    name: "Google Payroll",
    amount: -500,
    date: "2018-05-11",
    accountId: "joyceChaseSaving",
    category: null,
    included: true,
    createdAt: "2020-07-08T22:25:59.595Z",
    updatedAt: "2020-07-08T22:25:59.595Z",
    userId: 1,
  },
  {
    id: 9,
    name: "Google Payroll",
    amount: -500,
    date: "2018-05-11",
    accountId: "joyceChaseSaving",
    category: null,
    included: true,
    createdAt: "2020-07-08T22:25:59.595Z",
    updatedAt: "2020-07-08T22:25:59.595Z",
    userId: 1,
  },
  {
    id: 10,
    name: "Google Payroll",
    amount: -500,
    date: "2018-05-11",
    accountId: "joyceChaseChecking",
    category: null,
    included: true,
    createdAt: "2020-07-08T22:25:59.595Z",
    updatedAt: "2020-07-08T22:25:59.595Z",
    userId: 1,
  },
];
export function SpendingScreen({ navigation }) {
  // async fetchTrans() {
  //   try {
  //     const res = await axios.get(`${server}/api/transactions`);
  //     console.log(res.data);
  //   } catch (error) {
  //     console.log("ERRORrrrrr", error);
  //   }
  // }

  return (
    <Container>
      <Header />
      <Content>
        {data.filter((item) => {
          return (
            <View>
              <Text>{item.name}</Text>
            </View>
          );
        })}
        {/* <FlatList
          nestedScrollEnabled={true}
          data={data}
          renderItem={({ item }) => (
            <View>
              <Left>
                <Text>{item.name}</Text>
                <Text>{item.amount}</Text>
                <Text>{item.date}</Text>
              </Left>
              <Right>
                <Button
                  title="view"
                  transparent
                  onPress={() => navigation.navigate("SingleTransaction")}
                >
                  <Text>View</Text>
                </Button>
              </Right>
            </View>
          )}
        /> */}
      </Content>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    transactions: state.requestedTransactions,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchTransactions: () => dispatch(fetchTransactions()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SpendingScreen);

const Styles = {
  container: {
    paddingBottom: 10,
  },
  heading: {
    fontSize: 35,
    color: "green",
  },
  list: {
    border: 1,
    height: 80,
    padding: 20,
    fontSize: 40,
  },
};
