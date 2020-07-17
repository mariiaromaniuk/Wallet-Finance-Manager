import React from "react";
import {
  Container,
  Header,
  Content,
  List,
  Button,
  Title,
  Text,
  Left,
  Body,
  Right,
  Form,
  Picker,
  Card,
  CardItem,
  Icon,
} from "native-base";
import { LineChart } from "react-native-chart-kit";

import { View, FlatList, Dimensions } from "react-native";

import { connect } from "react-redux";
import { fetchTransactions } from "../../store/spending";
import { fetchAccounts } from "../../store/accounts";

export class SpendingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAccount: this.props.accounts.data[0].name,
      loaded: false,
    };
    this.calculateNetTotal = this.calculateNetTotal.bind(this);
    this.calculateAccountTotal = this.calculateAccountTotal.bind(this);
    // this.getAmountsPerTransaction = this.getAmountsPerTransaction.bind(this);
    this.onHandleChange = this.onHandleChange.bind(this);
  }

  componentDidMount() {
    this.props.fetchAccounts(this.props.user.id);
    this.props.fetchTransactions(this.props.user.id);
    this.setState({ loaded: true });
  }

  onHandleChange(value) {
    this.setState({
      selectedAccount: value,
    });
  }

  calculateNetTotal(items) {
    let total = 0;
    items.forEach((item) => {
      total += item.available_balance;
    });
    return total;
  }

  calculateAccountTotal(item) {
    return item.available_balance;
  }

  // getAmountsPerTransaction(array) {}
  render() {
    const accounts = this.props.accounts.data;
    const transactions = this.props.transactions;
    const acctInfo = accounts.filter((el) => {
      return el.name === this.state.selectedAccount;
    });
    let id = "";
    for (let i = 0; i < acctInfo.length; i++) {
      id = acctInfo[i].account_id;
    }
    const info = transactions.filter((account) => {
      return account.accountId === id;
    });
    return (
      <Container>
        <Header
          iosBarStyle
          androidStatusBarColor
          span
          style={{ backgroundColor: "#222831" }}
        >
          <Body>
            <Text
              style={{ marginTop: 10, alignSelf: "center", marginBottom: 20 }}
            >
              <Text style={{ fontSize: 30, color: "white" }}>
                Available Balance:{" "}
              </Text>
              <Text
                style={{ color: "green", fontSize: 25, fontWeight: "bold" }}
              >
                ${this.calculateNetTotal(accounts)}
              </Text>
            </Text>
          </Body>
        </Header>

        <Content style={{ padding: 20 }}>
          {/* <Form>
              <Picker
                style={{ backgroundColor: "green" }}
                mode="dropdown"
                style={{ width: 100, height: 60 }}
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
                        <Picker.Item
                          label={account.name}
                          value={account.name}
                        />
                      );
                    })
                  : null}
              </Picker>
            </Form> */}
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
            width={Dimensions.get("window").width - 40} // from react-native
            height={220}
            yAxisLabel="$"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: "#e26a00",
              backgroundGradientFrom: "#fb8c00",
              backgroundGradientTo: "#ffa726",
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
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
          <Text
            style={{
              alignSelf: "center",
              fontSize: 25,
              marginTop: 20,
              marginBottom: 10,
            }}
          >
            Latest Transactions
          </Text>
          {info.length
            ? info.map((item, index) => {
                return (
                  <Card>
                    <CardItem>
                      <Body>
                        <Text style={{ fontWeight: "500" }}>{item.name}</Text>
                        <Text style={{ alignSelf: "flex-end" }}>
                          <Text>{item.date}</Text>
                        </Text>
                        {item.amount < 0 ? (
                          <Text style={{ color: "green", fontWeight: "bold" }}>
                            ${item.amount}
                          </Text>
                        ) : (
                          <Text style={{ color: "red", fontWeight: "bold" }}>
                            ${item.amount}
                          </Text>
                        )}
                      </Body>
                    </CardItem>
                  </Card>
                );
              })
            : null}
        </Content>
      </Container>
    );
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
