import React, { Component } from "react";
import {
  View,
  TextInput,
  Image
} from 'react-native';
import { Container, Content, Header, Button, Text, Body, Card, CardItem } from "native-base";
import { connect } from 'react-redux';
import { setBudget } from '../../store/budget';
import { styles } from '../../styles';

class BudgetSetup extends Component {
  constructor() {
    super();
    this.state = {
      income: 0,
      staticCosts: 0,
      savings: 0,
      spendingBudget: 0
    };
  }

  render() {
    // console.log("PROPS", this.props)
    const userId = this.props.userId
    return (
      <View>
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
              Budget Setup
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
      <View style={styles.container1}>
        <Text style={styles.categoryText}>
          What is your monthly income? ($)
        </Text>
        <View>
          <TextInput
            style={styles.budgetInput}
            onChangeText={income => this.setState({ income: +income })}
            placeholder="Income"
          />
        </View>
      </View>

      <View style={styles.container1}>
        <Text style={styles.categoryText}>
          What are your monthly static costs? ($)
        </Text>
        <Text style={styles.categoryText}>
          ex: rent, utilities, insurance, etc.
        </Text>
        <View>
          <TextInput
            style={styles.budgetInput}
            onChangeText={staticCosts =>
              this.setState({ staticCosts: +staticCosts })}
            placeholder="Static Costs"
          />
        </View>
      </View>

      <View style={styles.container1}>
        <Text style={styles.categoryText}>
          How much would you like to save each month? ($)
        </Text>
        <View>
          <TextInput
            style={styles.budgetInput}
            onChangeText={savings => this.setState({ savings: +savings })}
            placeholder="Savings"
          />
        <Button
            block
            onPress={() => {
              const spendingBudget =
                this.state.income - this.state.staticCosts - this.state.savings;
              this.setState({ ...this.state, spendingBudget });
              this.props.setBudget({ ...this.state, spendingBudget }, userId);
              this.props.navigation.navigate('EditCategories', {
                title: 'Edit Categories'
              });
            }}
            primary
            style={{
              margin: 10, marginTop: 100, backgroundColor: "#6CBDC3",
            }}
          >
            <Text style={{ fontWeight: "bold" }}>Next</Text>
          </Button>
        </View>
      </View>
      </View>
    )
  }
}

const mapState = state => {
  return {
    budget: state.budget,
    userId: state.user.id
  };
};

const mapDispatch = dispatch => {
  return {
    setBudget: (budget, userId) => dispatch(setBudget(budget, userId))
  };
};

export default connect(mapState, mapDispatch)(BudgetSetup);
