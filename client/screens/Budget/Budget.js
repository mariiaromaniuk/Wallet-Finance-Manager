import React, { Component } from "react";
import { connect } from 'react-redux';
import { Container, Content, Header, Button, Text, Body, Card, CardItem } from "native-base";
import { fetchBudget } from "../../store/budget";
import { styles, pieColors } from '../../styles';
import { PieChart } from "react-native-chart-kit";
import { View, Dimensions } from "react-native";


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
const description = [
  '(Groceries, restaurants, bars, nightlife, etc.)',
  '(Gas, subway, train, bus, etc.)',
  '(Arts, entertainment, sports, outdoors, etc.)',
  '(Doctor visits, prescriptions, etc.)',
  '(Self-care, automotive, home repair, etc.)',
  '(Education, donations, offering, etc.)',
  '(Presents, clothes, accessories, etc.)',
];


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
          legendFontSize: 13
        });
        i++;
      }
    }
    return pieData;
  }

  toTitle(str, separator) {
    separator = typeof separator === 'undefined' ? ' ' : separator;
    return str
      .replace(/([a-z\d])([A-Z])/g, '$1' + separator + '$2')
      .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1' + separator + '$2')
      .replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
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
        <PieChart
          data={this.getData()}
          width={screenWidth}
          height={240}
          chartConfig={chartConfig}
          accessor="amount"
          backgroundColor="transparent"
          absolute
        />
        {this.getData().map((item, index) => {
                return (
                  <Card key={index} style={{ borderRadius: 8, padding: 8 }}>
                    <CardItem style={{ borderRadius: 8 }}>
                      <Body>
                        <Text style={{ fontWeight: "500", borderRadius: 20 }}>
                          {this.toTitle(item.name)}
                        </Text>
                        <Text style={{ borderRadius: 20 }}>
                          <Text>{description[index]}</Text>
                        </Text>
                        <Text style={{ color: "red", fontWeight: "bold", alignSelf: "flex-end" }}>
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
              margin: 2, marginTop: 20, backgroundColor: "#6CBDC3",
            }}
          >
            <Text style={{ fontWeight: "bold" }}>Setup Your Budget</Text>
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
              margin: 2, marginTop: 20, marginBottom: 50, backgroundColor: "#6CBDC3",
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