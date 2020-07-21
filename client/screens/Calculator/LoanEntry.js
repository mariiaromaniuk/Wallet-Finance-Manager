import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import LoanTypePicker from '../../components/LoanTypePicker.js';
import Amount from '../../components/Amount.js';
import LoanTerm from '../../components/LoanTerm.js';
import InterestRate from '../../components/InterestRate.js';
import { Container, Header, Body, Left } from "native-base";


export default class LoanEntry extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
        amount: 0, 
    };
  }

  changeAmount = (input) => {
     this.setState({ 
         amount: input})
    console.log(this.state)
    console.log(input)
  }

  changeLoanTerm = (input) => {
      this.setState({
          loanTerm: input
      })
  }

  changeTimeUnit = (input) => {
      this.setState({
          timeUnit: input
      })
  }

  changeInterest = (input) => {
      this.setState({
          interest: input
      })
      console.log("INTEREST", this.state)
      console.log("INPUT", input)
  }

  changeLoanType = (input) => {
      this.setState({
          loanType: "personal"
      })
  }

  render() {
    const { navigate } = this.props.navigation
    return (
     <Container>
        <Header
          iosBarStyle
          androidStatusBarColor
          style={{ backgroundColor: "#222831", height: 125 }}
        >
         {/* <Left>
            <Button
              transparent
              style={{ marginLeft: 10 }}
              onPress={() => this.props.navigation.goBack()}
            >
              <Icon name="arrow-back" style={{ color: "red", fontSize: 25 }} />
            </Button>
          </Left> */}
          <Body>
            <Text
              style={{
                color: "#D75452",
                alignSelf: "center",
                fontSize: 25,
                fontWeight: "bold",
              }}
            >
              Loan Calculator
            </Text>
            <Text style={{ alignSelf: "center" }}>
              <Text style={{ fontSize: 20, color: "white" }}>
              Enter Loan Info to Calculate:
              </Text>
            </Text>
          </Body>
        </Header>
        <View style={styles.fullScreen}>
            <View style={styles.info}>

                {/* <Text style={styles.screenTitle}>Enter Loan Info:</Text>
                <LoanTypePicker change={this.changeLoanType} loanState={this.state}></LoanTypePicker> */}

                <Text style={styles.title}>Amount:</Text>
                <Amount amountEntered={this.state.amount} change={this.changeAmount}></Amount>

                <Text style={styles.title}>Loan Term:</Text>
                <LoanTerm lengthEntered={this.state} change={this.changeLoanTerm} changeTime={this.changeTimeUnit}></LoanTerm>

                <Text style={styles.title}>Interest Rate:</Text>
                <InterestRate interestEntered={this.state.interest} changeInterest={this.changeInterest}></InterestRate>

                {this.state.amount > 0 && this.state.interest > 0 && this.state.loanTerm > 0 && this.state.timeUnit ? 
                    <Button
                        buttonStyle={styles.button}
                        onPress={() => navigate('Results', {
                            results: this.state
                        })}
                        icon={
                        <Icon
                            name="arrow-right"
                            size={15}
                            color="white"
                        />}
                        title="Calculate"
                    /> : 
                    <Button
                        disabledStyle={styles.buttonDisabled}
                        disabled={true}
                        color='red'
                        icon={
                        <Icon
                            name="arrow-up"
                            size={15}
                            color="red"
                    />}
                    title=" Enter Loan Info to Calculate"
                />}
            </View>
        </View>
      </Container>
    );
  }
}


const styles = StyleSheet.create({
    fullScreen: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: '#F2F2F2'
    },
    title: {
        color: "black",
        fontWeight: 'normal',
        marginTop:18,
        marginBottom:10,
        fontSize: 16,
    },
    button: {
        backgroundColor: '#6CBDC3',
        marginTop: 50,
        width: 360,
        height: 50,
        borderRadius: 8,
    },
    buttonDisabled: {
        marginTop: 50,
        width: 360,
        height: 50,
        borderRadius: 8,
    },
    info: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    }

})