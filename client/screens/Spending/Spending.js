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
  Form,
  Picker,
} from "native-base";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";

import { View, FlatList, Button, Dimensions } from "react-native";

import { connect } from "react-redux";
import { fetchTransactions } from "../../store/spending";
import {} from "../../store/accounts";
import axios from "axios";
import { server } from "../../server";
import { featurePolicy } from "helmet";
import { fetchAccounts } from "../../store/accounts";
import { cos } from "react-native-reanimated";

const netCash = 30000;

export class SpendingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAccount: "",
    };
    // this.fetchData = this.fetchData.bind(this);
    this.calculateNetTotal = this.calculateNetTotal.bind(this);
    this.calculateAccountTotal = this.calculateAccountTotal.bind(this);
    // this.getAmountsPerTransaction = this.getAmountsPerTransaction.bind(this);
    this.onHandleChange = this.onHandleChange.bind(this);
  }

  componentDidMount() {
    this.props.fetchAccounts(this.props.user.id);
    this.props.fetchTransactions(this.props.user.id);
  }

  onHandleChange(value) {
    this.setState({
      selectedAccount: value,
    });
  }

  calculateNetTotal(items) {
    let total = 0;
    items.forEach((account) => {
      total += account.available_balance;
    });
    return total;
  }

  calculateAccountTotal(items) {
    let total = 0;
    items.forEach((item) => {
      total += item.available_balance;
    });
    return total;
  }

  // getAmountsPerTransaction(array) {}
  render() {
    let accountInfo = [];
    if (this.props.accounts.data) {
      accountInfo = this.props.accounts.data.map((el) => {
        return el.name;
      });
    }
    console.log("ACCOUNTINFO", accountInfo);
    const name = accountInfo.find((el) => {
      return el === this.state.selectedAccount;
    });

    console.log("NAME", name, "STATE", this.state.selectedAccount);

    const info = this.props.transactions.filter((el) => {
      return el.name === this.state.selectedAccount;
    });
    console.log("INFO", info);
    // console.log("ACCOUNTS", this.props.accounts.data);
    // console.log("STATE", this.state);
    if (this.props.transactions.length) {
      return (
        <Container style={{ fontFamily: "Roboto" }}>
          <Header />
          <Text style={{ fontSize: 30 }}>
            Total Available Balance: $
            {this.calculateNetTotal(this.props.accounts.data)}
          </Text>

          <Form>
            <Picker
              style={{ backgroundColor: "green" }}
              mode="dropdown"
              style={{ width: 120, height: 40 }}
              onValueChange={this.onHandleChange.bind(this)}
            >
              <Picker.item
                label="choose account"
                value="Please choose an account"
                enabled={false}
              />
              {this.props.accounts.data.length
                ? this.props.accounts.data.map((account) => {
                    return (
                      <Picker.Item label={account.name} value={account.name} />
                    );
                  })
                : null}
            </Picker>
          </Form>
          <View>
            <Text>
              Account Balance:
              {this.calculateAccountTotal(this.props.accounts.data)}
            </Text>
            <Text>Transactions for Account</Text>
            {info.length ? (
              <LineChart
                data={{
                  labels: ["MAY", "JUNE", "JULY"],
                  datasets: [
                    {
                      data: info.map((el) => {
                        return el.amount * -1;
                      }),
                    },
                  ],
                }}
                width={Dimensions.get("window").width} // from react-native
                height={220}
                yAxisLabel="$"
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                  backgroundColor: "#e26a00",
                  backgroundGradientFrom: "#fb8c00",
                  backgroundGradientTo: "#ffa726",
                  decimalPlaces: 2, // optional, defaults to 2dp
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  labelColor: (opacity = 1) =>
                    `rgba(255, 255, 255, ${opacity})`,
                  style: {
                    borderRadius: 16,
                  },
                  propsForDots: {
                    r: "6",
                    strokeWidth: "2",
                    stroke: "#ffa726",
                  },
                }}
                bezier
                style={{
                  marginVertical: 8,
                  borderRadius: 16,
                }}
              />
            ) : (
              <View
                style={{
                  width: Dimensions.get("window").width,
                  height: 220,
                  backgroundColor: "#e26a00",
                  backgroundGradientFrom: "#fb8c00",
                  backgroundGradientTo: "#ffa726",
                  color: "#ffffff",
                  justifyContent: "center",
                  alignContent: "center",
                }}
              >
                <Text>Please Select an Account</Text>
              </View>
            )}
          </View>
          <Content style={{ alignSelf: "center", marginTop: 1 }}>
            <Text style={{ alignSelf: "center" }}>All Transactions</Text>
            {info.map((item, index) => {
              return (
                <View
                  style={{
                    alignContent: "center",
                    backgroundColor: "lightgray",
                    width: Dimensions.get("window").width,
                    borderBottomWidth: 1,
                    marginBottom: 5,
                  }}
                >
                  <Text>{item.name}</Text>
                  <Text>{item.amount * -1}</Text>
                  <Text>{item.date}</Text>
                </View>
              );
            })}
          </Content>
        </Container>
      );
    } else {
      return <Text>...loading</Text>;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    transactions: state.transactions,
    accounts: state.accounts,
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchTransactions: (id) => dispatch(fetchTransactions(id)),
  fetchAccounts: (id) => dispatch(fetchAccounts(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SpendingScreen);

const Styles = {
  container: {
    paddingBottom: 0,
  },
  heading: {
    fontSize: 35,
    color: "green",
  },
  list: {
    border: 1,
    height: 80,
    padding: 0,
    fontSize: 40,
  },
  card1: {
    backgroundColor: "red",
  },
};
