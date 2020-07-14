import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  Image
} from 'react-native';
import { Button} from "native-base";
import { connect } from 'react-redux';
import { setBudget } from '../../store/budget';

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
    const question1 = (
      <View>
        <Text>
          What is your monthly income? ($)
        </Text>
        <View>
          <TextInput
            onChangeText={income => this.setState({ income: +income })}
            placeholder="Income"
          />
          <Button
            title={"Next"}
            onPress={() => {
              this.setState({ question: 2 });
            }}
          />
        </View>
      </View>
    );

    const question2 = (
      <View>
        <Text>
          What are your monthly static costs? ($)
          ex: rent, utilities, insurance, etc.
        </Text>
        <View>
          <TextInput
            onChangeText={staticCosts =>
              this.setState({ staticCosts: +staticCosts })}
            placeholder="Static Costs"
          />
          <Button
            title={"Next"}
            onPress={() => {
              this.setState({ question: 3 });
            }}
          />
        </View>
      </View>
    );

    const question3 = (
      <View>
        <Text>
          How much would you like to save each month? ($)
        </Text>
        <View>
          <TextInput
            onChangeText={savings => this.setState({ savings: +savings })}
            placeholder="Savings"
          />
          {/* <Button
            title={"Next"}
            onPress={() => {
              const spendingBudget =
                this.state.income - this.state.staticCosts - this.state.savings;
              this.props.setBudget({ ...this.state, spendingBudget });
              this.props.navigation.navigate('EditBudget', {
                title: 'EditBudget'
              });
            }}
          /> */}
        </View>
      </View>
    );

    let question;

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
    budget: state.budget
  };
};

const mapDispatch = dispatch => {
  return {
    setBudget: budget => dispatch(setBudget(budget))
  };
};

export default connect(mapState, mapDispatch)(BudgetSetup);