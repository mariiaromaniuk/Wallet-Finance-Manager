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
  Card,
  CardItem,
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
import { fetchAccounts } from "../../store/accounts";
import { acc } from "react-native-reanimated";

const netCash = 30000;

export class SpendingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAccount: this.props.accounts.data[0].name,
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

  calculateNetTotal(account) {
      return account.available_balance;
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
    const accounts = this.props.accounts.data;
    const transactions = this.props.transactions;
    let id = "";
    const acctInfo = accounts.filter((el) => {
      return el.name === this.state.selectedAccount;
    });
    for (let i = 0; i < acctInfo.length; i++) {
      id = acctInfo[i].account_id;
    }
    const info = transactions.filter((account) => {
      return account.accountId === id;
    });
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
              style={{ width: 120, height: 60 }}
              onValueChange={this.onHandleChange}
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
          <View style={{ marginTop: -15 }}>
            <Text>
              Account Balance:
              {this.calculateAccountTotal(transactions)}
            </Text>
            <Text>Transactions for Account</Text>
            
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
            
          </View>
          <Content style={{ alignSelf: "center", marginTop: 1 }}>
            <Text style={{ alignSelf: "center" }}>All Transactions</Text>
            {info.map((item, index) => {
              return (
                <View
                  style={{
                    alignContent: "center",
                    backgroundColor: "",
                    width: Dimensions.get("window").width,
                    marginBottom: 5,
                  }}
                >
                  <Card>
                    <CardItem>
                      <Body>
                        <Text>${this.props.amount}</Text>
                        <Text>{item.name}</Text>
                        <Text>{item.amount}</Text>
                        <Text>{item.date}</Text>
                      </Body>
                    </CardItem>
                  </Card>
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
