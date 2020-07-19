import React, { Component } from "react";
import {
  Container,
  Header,
  Text,
  Picker,
  Icon,
  Body,
  Item,
  Form,
  Input,
  Button,
  Label,
} from "native-base";
import { connect } from "react-redux";
import { View, Dimensions } from "react-native";
import { fetchTransactions } from "../../store/spending";
import { fetchAccounts } from "../../store/accounts";
import { fetchBudget } from "../../store/budget";
import { ScrollView } from "react-native";
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
    const userId = this.props.userId;
    await this.props.handleRetrieval(userId);
    await this.props.handleRetrievalOfTransactions(userId);
    await this.props.fetchBudget(userId);

    const transactions = this.props.transactions;
    const accounts = this.props.accounts;

    transactions.map((transaction) => {
      transaction.amount = Math.trunc(transaction.amount) * -1;
    });

    const transactionsByMonths = new Map();
    const accountsAndBalances = new Map();

    organizeTransactionsByMonths(
      transactionsByMonths,
      accountsAndBalances,
      accounts,
      transactions
    );

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
    const userFirstName = this.props.firstName;
    const accountsAndBalances = this.state.accountsAndBalances;
    const transactionsByMonths = this.state.transactionsByMonths;
    const moneyEarned = renderPosTransactionsByMonths(transactionsByMonths);
    const moneySpent = renderNegTransactionsByMonths(transactionsByMonths);
    const budgets = this.props.budget;
    const progress = budgetProgress(budgets);
    const chartWidth = Dimensions.get("window").width - 40;

    return (
      <Container>
        <Header
          iosBarStyle
          androidStatusBarColor
          style={{ backgroundColor: "#222831", height: 60 }}
        >
          <Body>
            <Text
              style={{
                color: "#ffff",
                alignSelf: "center",
                fontSize: 20,
                fontWeight: "bold",
                paddingBottom: 15,
              }}
            >
              Overview
            </Text>
          </Body>
        </Header>
        <ScrollView style={{ padding: 20 }}>
          <Text style={{ fontSize: 20, margin: 10, padding: 5 }}>
            Hello {userFirstName}, here's your account overview!
          </Text>
          {renderAccountAndBalances(accountsAndBalances).map((comp) => comp)}

          {/* ============= MONEY EARNED ON A MONTHLY BASIS ============= */}
          <Text style={{ alignSelf: "center" }}>Monthy Earnings</Text>
          <LineChart
            data={{
              // get last three months pulled from Plaid api
              labels: this.state.months,
              // insert in order total amount of income from last three months
              datasets: [
                {
                  data: moneyEarned.length ? moneyEarned : [0, 0, 0, 0],
                },
              ],
            }}
            width={chartWidth} // from react-native
            height={220}
            yAxisLabel="$"
            yAxisInterval={1} // optional, defaults to 1
            // Chart's configurations i.e styles, precision, etc.
            chartConfig={{
              backgroundColor: "#e26a00",
              backgroundGradientFrom: "#82E0AA",
              backgroundGradientTo: "#82E0AA",
              decimalPlaces: 0, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(35, 155, 86, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "5",
                strokeWidth: "1",
                stroke: "#2ECC71",
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />

          {/* ============= MONEY SPENT ON A MONTHLY BASIS ============= */}
          <Text style={{ alignSelf: "center" }}>Monthy Expenditures</Text>
          <LineChart
            data={{
              // get last three months pulled from Plaid api
              labels: this.state.months,
              // insert in order total amount of income from last three months
              datasets: [
                {
                  data: moneySpent.length ? moneySpent : [0, 0, 0, 0],
                },
              ],
            }}
            width={chartWidth} // from react-native
            height={220}
            yAxisLabel="$"
            yAxisInterval={1} // optional, defaults to 1
            // Chart's configurations i.e styles, precision, etc.
            chartConfig={{
              backgroundColor: "#e26a00",
              backgroundGradientFrom: "#F1948A",
              backgroundGradientTo: "#F1948A",
              decimalPlaces: 0, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(203, 67, 53, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "5",
                strokeWidth: "1",
                stroke: "#E74C3C",
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />

          {/* ============= BUDGET PROGRESSION ============= */}
          <Text style={{ alignSelf: "center", paddingBottom: 8 }}>
            Budget Progression
          </Text>
          <ProgressChart
            // each value represents a goal ring in Progress chart
            data={{
              labels: Object.keys(budgets).filter(
                (key) =>
                  key !== "id" &&
                  key !== "userId" &&
                  key !== "updatedAt" &&
                  key !== "createdAt" &&
                  key !== "income" &&
                  key !== "staticCosts" &&
                  key !== "savings" &&
                  key !== "spendingBudget"
              ), // all budgets, dynamic
              data: progress.length ? progress : [0, 0, 0, 0, 0, 0, 0],
            }}
            width={chartWidth} // from react-native
            height={220}
            strokeWidth={7}
            radius={20}
            chartConfig={{
              backgroundColor: "#e26a00",
              backgroundGradientFrom: "#7FB3D5",
              backgroundGradientTo: "#7FB3D5",
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
            hideLegend={false}
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </ScrollView>
      </Container>
    );
  }
}

const mapStateToProp = (state) => {
  return {
    firstName: state.user.firstName,
    transactions: state.transactions,
    accounts: state.accounts.data,
    userId: state.user.id,
    budget: state.budget,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleRetrieval: (id) => dispatch(fetchAccounts(id)),
    handleRetrievalOfTransactions: (id) => dispatch(fetchTransactions(id)),
    fetchBudget: (id) => dispatch(fetchBudget(id)),
  };
};

export default connect(mapStateToProp, mapDispatch)(Dashboard);

function renderAccountAndBalances(map) {
  const retArr = [];
  let id = 0;
  for (let key of map.keys()) {
    retArr.push(
      <Banner key={id++} header={key} amount={map.get(key)}></Banner>
    );
  }
  return retArr;
}

function renderPosTransactionsByMonths(map) {
  const retArr = [];
  for (let key of map.keys()) {
    retArr.push(map.get(key)[1]);
  }
  return retArr;
}

function renderNegTransactionsByMonths(map) {
  const retArr = [];
  for (let key of map.keys()) {
    retArr.push(map.get(key)[0]);
  }
  return retArr;
}

async function organizeTransactionsByMonths(
  transactionsByMonths,
  accountsAndBalances,
  accounts,
  transactions
) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  try {
    // initializing map -> month: [moneySpent, moneyEarned]
    for (let i = 0; i < months.length; i++) {
      const currentMonth = months[i];
      if (!transactionsByMonths.has(currentMonth)) {
        transactionsByMonths.set(currentMonth, [0, 0]);
      }
    }

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

      if (moneySpent === 0 && moneyEarned === 0) {
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
  } catch (error) {
    console.error("organizeTransactionsByMonths ERROR", error);
  }
}

function budgetProgress(obj) {
  const retArr = [];
  for (const [key, value] of Object.entries(obj)) {
    if (
      key !== "id" &&
      key !== "userId" &&
      key !== "updatedAt" &&
      key !== "createdAt" &&
      key !== "income" &&
      key !== "staticCosts" &&
      key !== "savings" &&
      key !== "spendingBudget"
    ) {
      retArr.push(value / 100);
    }
  }

  return retArr;
}
