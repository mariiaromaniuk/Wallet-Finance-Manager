import React, { Component } from "react";
import { Container, Text, Item, Form, Input, Button, Label } from "native-base";
import { connect } from "react-redux";
import { View, Dimensions } from "react-native";
import { fetchInfo, fetchTransactions } from "../../store/Dashboard";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import Banner from "./Card";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: [],
      months: [],
      accounts: [],
      transactionsByMonths: [],
      accountsAndBalances: [],
    };
  }

  async componentDidMount() {
    await this.props.handleRetrieval();
    await this.props.handleRetrievalOfTransactions();

    const transactions = this.props.transactions;
    const accounts = this.props.accounts;

    transactions.map((transaction) => {
      transaction.amount = transaction.amount * -1;
    });

    const transactionsByMonths = new Map();
    const accountsAndBalances = new Map();

    const organizeTransactionsByMonths = () => {
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      // initializing map -> month: [moneySpent, moneyEarned]
      for (let i = 0; i < months.length; i++) {
        const currentMonth = months[i];
        if (!transactionsByMonths.has(currentMonth)) {
          transactionsByMonths.set(currentMonth, [0, 0]);
        }
      }
      // console.log("transactionsByMonths", transactionsByMonths);

      // partitioning money spent/earned by months where index 0 => money spent & index 1 => incoming money
      for (let i = 0; i < transactions.length; i++) {
        const currentTransaction = transactions[i];
        const currentTransactionMonth =
          Number(currentTransaction.date.slice(5, 7)) - 1;
        const moneySpent = transactionsByMonths.get(
          months[currentTransactionMonth]
        )[0];
        const moneyEarned = transactionsByMonths.get(
          months[currentTransactionMonth]
        )[1];
        // console.log(
        //   currentTransactionMonth,
        //   months[currentTransactionMonth],
        //   currentTransaction
        // );
        if (currentTransaction.amount < 0) {
          transactionsByMonths.set(months[currentTransactionMonth], [
            moneySpent + currentTransaction.amount,
            moneyEarned,
          ]);
        } else {
          transactionsByMonths.set(months[currentTransactionMonth], [
            moneySpent,
            moneyEarned + currentTransaction.amount,
          ]);
        }
      }

      // filter all months with no history
      for (let month of transactionsByMonths.keys()) {
        const currentMonthHistory = transactionsByMonths.get(month);
        const moneySpent = currentMonthHistory[0];
        const moneyEarned = currentMonthHistory[1];

        if (moneySpent + moneyEarned === 0) {
          transactionsByMonths.delete(month);
        }
      }
      // ============ Accounts ============
      // NETWORTH: Get all available balances - all current balance
      accountsAndBalances.set("Networth", 0);
      for (let i = 0; i < accounts.length; i++) {
        const account = accounts[i];
        accountsAndBalances.set(
          "Networth",
          accountsAndBalances.get("Networth") + account.available_balance
        );
        accountsAndBalances.set(
          "Networth",
          accountsAndBalances.get("Networth") - account.current_balance
        );
      }
      // CASH: Get all available balances
      accountsAndBalances.set("Cash", 0);
      for (let i = 0; i < accounts.length; i++) {
        const account = accounts[i];
        accountsAndBalances.set(
          "Cash",
          accountsAndBalances.get("Cash") + account.available_balance
        );
      }
      // CREDIT CARDS: Get all credit card debt
      accountsAndBalances.set("Credit Cards", 0);
      for (let i = 0; i < accounts.length; i++) {
        const account = accounts[i];
        if (account.name.toLowerCase().includes("credit card")) {
          accountsAndBalances.set(
            "Credit Cards",
            accountsAndBalances.get("Credit Cards") + account.current_balance
          );
        }
      }
      console.log("accountsAndBalances", accountsAndBalances);
    };

    organizeTransactionsByMonths();
    console.log("transactionsByMonths part 2", transactionsByMonths);

    this.setState({
      ...this.state,
      transactions,
      months: [...transactionsByMonths.keys()],
      accounts,
      transactionsByMonths,
      accountsAndBalances,
    });
  }

  render() {
    console.log("This is the state");
    console.log(this.state);
    const userFirstName = this.props.firstName;
    const accountsAndBalances = this.state.accountsAndBalances;
    return (
      <Container>
        <Text style={{ fontSize: 50, margin: 0, padding: 0 }}>
          Hello {userFirstName}
        </Text>
        {renderAccountAndBalances(accountsAndBalances).map((comp) => comp)}
        <LineChart
          data={{
            // get last three months pulled from Plaid api
            labels: this.state.months,
            // insert in order total amount of income from last three months
            datasets: [
              {
                data: [4, 5],
              },
            ],
          }}
          width={Dimensions.get("window").width} // from react-native
          height={220}
          yAxisLabel="$"
          yAxisSuffix="k"
          yAxisInterval={1} // optional, defaults to 1
          // Chart's configurations i.e styles, precision, etc.
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
      </Container>
    );
  }
}

const mapStateToProp = (state) => {
  return {
    firstName: state.user.firstName,
    transactions: state.dashboard.transactions,
    accounts: state.dashboard.accounts,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleRetrieval: () => dispatch(fetchInfo()),
    handleRetrievalOfTransactions: () => dispatch(fetchTransactions()),
  };
};

export default connect(mapStateToProp, mapDispatch)(Dashboard);

function renderAccountAndBalances(map) {
  console.log("asdfasdfasdfasfd", map);
  const retArr = [];
  let id = 0;
  for (let key of map.keys()) {
    console.log("inside the loop", key);
    retArr.push(
      <Banner key={id++} header={key} amount={map.get(key)}></Banner>
    );
  }
  return retArr;
}
