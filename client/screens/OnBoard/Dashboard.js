import React, { Component } from "react";
import { Container, Text, Item, Form, Input, Button, Label } from "native-base";
import { connect } from "react-redux";
import { View, Dimensions } from "react-native";
import { fetchInfo } from "../../store/Dashboard";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "" };
  }

  async componentDidMount() {
    const info = this.props.handleRetrieval();
    // this.setState(this.state);
    console.log("info", info);
  }

  render() {
    const userFirstName = this.props.firstName;
    // const userId = this.props.userId;
    // console.log("ACCOUNTS : ", this.props.handleRetrieval(userId));
    // const account = this.props.handleRetrieval(userId).info.available_balance;
    return (
      <View>
        <Text>Hello {userFirstName}</Text>
        <LineChart
          data={{
            // get last three months pulled from Plaid api
            labels: ["January", "February", "March", "April", "May", "June"],
            // insert in order total amount of income from last three months
            datasets: [
              {
                data: [
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                ],
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
      </View>
    );
  }
}

const mapStateToProp = (state) => {
  // console.log("This is the state");
  // console.log(state);
  return {
    firstName: state.user.firstName,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleRetrieval: () => dispatch(fetchInfo()),
  };
};

export default connect(mapStateToProp, mapDispatch)(Dashboard);
