import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  Image
} from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { setBudget } from '../../store/budget';
import { styles } from '../../styles';

class BudgetSetup extends Component {
  constructor() {
    super();
    this.state = {
      question: 1,
      income: 0,
      staticCosts: 0,
      savings: 0,
      spendingBudget: 0
    };
  }

  render() {
    console.log("PROPS", this.props)
    const userId = this.props.userId
    const question1 = (
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
          <Button
            type="outline"
            block style={{ margin: 100, marginTop: 40 }} bordered danger
            title={"Next"}
            onPress={() => {
              this.setState({ question: 2 });
            }}
          />
        </View>
      </View>
    );
    console.log("INCOME", this.state.income)

    const question2 = (
      <View style={styles.container1}>
        <Text style={styles.categoryText}>
          What are your monthly static costs? ($)
          ex: rent, utilities, insurance, etc.
        </Text>
        <View>
          <TextInput
            style={styles.budgetInput}
            onChangeText={staticCosts =>
              this.setState({ staticCosts: +staticCosts })}
            placeholder="Static Costs"
          />
          <Button
            type="outline"
            block style={{ margin: 100, marginTop: 40 }} bordered danger
            title={"Next"}
            onPress={() => {
              this.setState({ question: 3 });
            }}
          />
        </View>
      </View>
    );
    console.log("STATIC", this.state.staticCosts)

    const question3 = (
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
            type="outline"
            block style={{ margin: 100, marginTop: 40 }} bordered danger
            title={"Next"}
            onPress={() => {
              const spendingBudget =
                this.state.income - this.state.staticCosts - this.state.savings;
                this.setState({ ...this.state, spendingBudget });
              this.props.setBudget({ ...this.state, spendingBudget }, userId);
              this.props.navigation.navigate('EditCategories', {
                title: 'Edit Categories'
              });
            }}
          />
        </View>
      </View>
    );

    if (this.state.question === 1) 
      return question1;
    else if (this.state.question === 2) 
      return question2;
    else 
      return question3;
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
