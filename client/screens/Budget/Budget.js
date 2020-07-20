import React, { Component } from "react";
import { connect } from 'react-redux';
import { Container, Content, Header, Button, Text, Body, Card, CardItem } from "native-base";
import { fetchBudget } from "../../store/budget";
import { styles, pieColors } from '../../styles';
import { PieChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";


const screenWidth = Dimensions.get("window").width;
const chartConfig = {
  cutoutPercentage: "50",
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0.5,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 3, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
  withVerticalLabels: true,
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


        <Content style={{ padding: 20 }}>
        <Text
            style={{
              alignSelf: "center",
              fontSize: 25,
              marginTop: 20,
              marginBottom: 10,
            }}
          >
            Budget Categories
          </Text>

        <PieChart
          data={this.getData()}
          width={screenWidth}
          height={250}
          chartConfig={chartConfig}
          accessor="amount"
          backgroundColor="transparent"
          paddingLeft="10"
          absolute
        />
        {this.getData().map((item, index) => {
                return (
                  <Card key={index} style={{ borderRadius: 8, padding: 8 }}>
                    <CardItem style={{ borderRadius: 8 }}>
                      <Body>
                        <Text style={{ fontWeight: "500", borderRadius: 20 }}>
                          {item.name}
                        </Text>
                        <Text style={{ color: "red", fontWeight: "bold" }}>
                          {item.amount}%
                        </Text>
                      </Body>
                    </CardItem>
                  </Card>
                );
              })
            }
            <Button
            block
            onPress={() => {
              this.props.navigation.navigate('BudgetSetup', {
                title: 'BudgetSetup'
              });
            }}
            primary
            style={{
              margin: 10, marginTop: 20, backgroundColor: "#6CBDC3",
            }}
          >
            <Text style={{ fontWeight: "bold" }}>Edit Budget</Text>
          </Button>

          <Button
            block
            onPress={() => {
              this.props.navigation.navigate('EditCategories', {
                title: 'EditCategories'
              });
            }}
            primary
            style={{
              margin: 10, marginBottom: 50, backgroundColor: "#6CBDC3",
            }}
          >
            <Text style={{ fontWeight: "bold" }}>Edit Budget Categories</Text>
          </Button>
        </Content>
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