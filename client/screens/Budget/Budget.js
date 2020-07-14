import React, { Component } from "react";
import { connect } from 'react-redux';
import { View, Text, Button } from 'react-native';
import { createStackNavigator } from 'react-navigation';
// import BudgetSetup from './BudgetSetup';
import Pie from './Pie';

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

const data = [
  {
    name: "Food / Drink",
    population: 35,
    color: "#EF4C22",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  },
  {
    name: "Travel",
    population: 10,
    color: "#f1dd6a",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  },
  {
    name: "Recreation",
    population: 15,
    color: "#D4F2D2",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  },
  {
    name: "Healthcare",
    population: 10,
    color: "#B776B2",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  },
  {
    name: "Service",
    population: 10,
    color: "#84A59D",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  },
  {
    name: "Community",
    population: 10,
    color: "#262560",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  },
  {
    name: "Shops",
    population: 10,
    color: "#4F5DA9",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  }
];

class Budget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // activeIndex: 0
    };
    // this._onPieItemSelected = this._onPieItemSelected.bind(this);
    // this.getData = this.getData.bind(this);
  }

  // _onPieItemSelected(newIndex) {
  //   this.setState({ ...this.state, activeIndex: newIndex });
  // }

  // getData() {
  //   const { budget } = this.props;
  //   let pieData = [];
  //   let categories = [
  //     'foodAndDrink',
  //     'community',
  //     'healthcare',
  //     'recreation',
  //     'service',
  //     'shops',
  //     'travel'
  //   ];

  //   for (let key in budget) {
  //     if (categories.includes(key)) {
  //       const properCase = key
  //         .replace(/([a-z\d])([A-Z])/g, '$1' + ' ' + '$2')
  //         .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1' + ' ' + '$2')
  //         .replace(/\w\S*/g, function(txt) {
  //           return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  //         });
  //       pieData.push({ name: properCase, number: budget[key] });
  //     }
  //   }
  //   return pieData;
  // }

  render() {
    return (
      <View>
        <Text>Budget</Text>
          <PieChart
            data={data}
            width={screenWidth}
            height={220}
            chartConfig={chartConfig}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />


          
        {/* <View>
          <Pie
            pieWidth={225}
            pieHeight={225}
            onItemSelected={this._onPieItemSelected}
            colors={pieColor}
            data={data}
          />

          <View>
            <Button
              title={`Edit Budget`}
              onPress={() => {
                this.props.navigation.navigate('BudgetSetup', {
                  title: 'BudgetSetup'
                });
              }}
            />
          </View>
        </View> */}
      </View>
    );
  }
}

const mapState = state => {
  return {
    // user: state.user,
    // budget: state.acctTrans.budget
  };
};

const BudgetConnect = connect(mapState, null)(Budget);
export default BudgetConnect;