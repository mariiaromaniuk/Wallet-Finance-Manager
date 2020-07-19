import React, { Component } from "react";
import { connect } from 'react-redux';
import { View } from 'react-native';
import { Container, Header, Button, Text, Body, } from "native-base";
import { fetchBudget } from "../../store/budget";
import { styles, pieColors } from '../../styles';
// import Pie from './Pie';

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";

import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;

const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false // optional
};


class Budget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0
    };
    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    this.props.fetchBudget(this.props.user.id)
  }

  getData() {
    // console.log('PROPS', this.props.budget)
    const budget = this.props.budget;
    let pieData = [];
    let categories = [
      'foodAndDrink',
      'community',
      'healthcare',
      'recreation',
      'service',
      'shops',
      'travel'
    ];

    let i = 0;
    for (let key in budget) {
      if (categories.includes(key)) {
        pieData.push({
          name: key,
          amount: budget[key],
          color: pieColors[i],
          legendFontColor: "#7F7F7F",
          legendFontSize: 15
        });
        i++;
      }
    }
    return pieData;
  }

  render() {
    return (
      <Container>
        <Header
          iosBarStyle
          androidStatusBarColor
          style={{ backgroundColor: "#222831", height: 125 }}
        >
          <Body>
            <Text
              style={{
                color: "#fc5185",
                alignSelf: "center",
                fontSize: 25,
                fontWeight: "bold",
              }}
            >
              Budget
            </Text>
            <Text style={{ alignSelf: "center" }}>
              <Text style={{ fontSize: 20, color: "white" }}>
                Spending Budget: {this.props.budget.spendingBudget}
              </Text>
              <Text
                style={{ color: "#d3dbff", fontSize: 20, fontWeight: "bold" }}
              >
                $
              </Text>
            </Text>
          </Body>
        </Header>

        <PieChart
          data={this.getData()}
          width={screenWidth}
          height={220}
          chartConfig={chartConfig}
          accessor="amount"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
        <Button
            block
            onPress={() => {
              this.props.navigation.navigate('BudgetSetup', {
                title: 'BudgetSetup'
              });
            }}
            primary
            style={{
              margin: 10,backgroundColor: "#6CBDC3",
            }}
          >
            <Text style={{ fontWeight: "bold" }}>Edit Budget</Text>
          </Button>
      </Container>
    );
  }
}

const mapState = state => {
  return {
    user: state.user,
    budget: state.budget,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchBudget: (id) => dispatch(fetchBudget(id)),
  };
};

export default connect(mapState, mapDispatch)(Budget);