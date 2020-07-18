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
          How much would you like 
        </Text>
        <Text style={styles.categoryText}>
          to save each month? ($)
        </Text>
        <View>
          <TextInput
            style={styles.budgetInput}
            onChangeText={savings => this.setState({ savings: +savings })}
            placeholder="Savings"
          />
          <Button
            type="outline"
            block style={{ margin: 100, marginTop: 95 }} bordered danger
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
