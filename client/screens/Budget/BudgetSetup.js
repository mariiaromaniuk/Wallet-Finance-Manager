import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  Image
} from 'react-native';
import {
  Container,
  Content,
  Button,
  Header,
  Body
} from "native-base";
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
      <View style={styles.container}>
        <Text>
          What is your monthly income? ($)
        </Text>
        <View>
          <TextInput
            onChangeText={income => this.setState({ income: +income })}
            placeholder="Income"
          />
          <Button
            block style={{ marginTop: 20 }}  bordered danger
            title={"Next"}
            onPress={() => {
              this.setState({ question: 2 });
            }}
          />
        </View>
      </View>
    );

    const question2 = (
      <View style={styles.container}>
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
            block style={{ marginTop: 20 }}  bordered danger
            title={"Next"}
            onPress={() => {
              this.setState({ question: 3 });
            }}
          />
        </View>
      </View>
    );

    const question3 = (
      <View style={styles.container}>
        <Text>
          How much would you like to save each month? ($)
        </Text>
        <View>
          <TextInput
            onChangeText={savings => this.setState({ savings: +savings })}
            placeholder="Savings"
          />
          <Button
            block style={{ marginTop: 20 }}  bordered danger
            title={"Next"}
            onPress={() => {
              const spendingBudget =
                this.state.income - this.state.staticCosts - this.state.savings;
              this.props.setBudget({ ...this.state, spendingBudget });
              this.props.navigation.navigate('Budget', {
                title: 'Budget'
              });
            }}
          />
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


const styles = {
  container: {
    flexGrow: 1,
    paddingTop: 40,
    // alignItems: 'center',
  },
  title: {
    color: "white",
    fontWeight: 'bold',
    position: 'absolute',
  },
  text: {
    alignSelf: 'center',
    paddingTop: 15,
    padding: 8,
    color: "#D16C58",
    fontWeight: 'bold',
    fontSize: 30,
  }
};