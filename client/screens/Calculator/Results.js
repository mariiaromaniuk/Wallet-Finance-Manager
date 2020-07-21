import React from 'react'
import { View, Text, StyleSheet, Dimensions,ScrollView } from 'react-native'
import Summary from '../../components/Summary.js'
import { Container, Content, Header, Body, Left, Card, CardItem } from "native-base";

export default class Results extends React.Component{

    roundHundredthPlace(num){
        return Math.floor(num * 100) / 100
    }

    roundDownHundredthPlace(num){
        return Math.ceil(num * 100) / 100
    }

    calculateMonthlyPayment = (input) => {
        const rate = input.interest / 100
        const monthly = 12

        const interestCalculation = rate / monthly
        // const negativeMonth = input.loanTerm * -1
        let negativeMonth = 0
        let numberMonths = 0

        if (input.timeUnit === "years") {
            negativeMonth = (input.loanTerm * 12) * -1
            numberMonths = input.loanTerm * 12
            // console.log(negativeMonth)
        } else if (input.timeUnit === "months") {
            negativeMonth = input.loanTerm * -1
            numberMonths = input.loanTerm
            // console.log(negativeMonth)
        }

        let monthlyTotal = (input.amount * interestCalculation) / (1 - Math.pow((1 + interestCalculation),negativeMonth))

        return this.calculateMonthlySchedule(interestCalculation, monthlyTotal, input.amount, numberMonths)
    }

    monthlyForDisplay = (input) => {
        const rate = input.interest / 100
        const monthly = 12

        const interestCalculation = rate / monthly
        let negativeMonth = 0

        if (input.timeUnit === "years") {
            negativeMonth = (input.loanTerm * 12) * -1
        } else if (input.timeUnit === "months") {
            negativeMonth = input.loanTerm * -1
        }

        let monthlyTotal = (input.amount * interestCalculation) / (1 - Math.pow((1 + interestCalculation),negativeMonth))
        let totalWithApr = monthlyTotal * (Math.abs(negativeMonth))

        let interestAmount = totalWithApr - input.amount

        let arr = [this.roundHundredthPlace(monthlyTotal), this.roundHundredthPlace(totalWithApr), this.roundHundredthPlace(interestAmount)]
        console.log(monthlyTotal)
        
        return arr
    }

    calculateMonthlySchedule = (interest, monthlyPay, principalAmount, length) => {
        let balance = principalAmount
        let payment = []
        for (let i = 0; i < length; i++) {
            let singlePayment = []

            let modifiedInterest = this.roundHundredthPlace(balance * interest)

            let principalPayment = this.roundHundredthPlace(monthlyPay - modifiedInterest)

            balance -= principalPayment

            if (balance < 1) {
                balance = 0
            }

            singlePayment.push(i + 1)
            singlePayment.push(modifiedInterest)
            singlePayment.push(principalPayment)
            singlePayment.push(this.roundHundredthPlace(balance))
            
            payment.push(singlePayment)
        }
        return payment
    }

    render(){
        // const { info } = this.props.route.params.results
        // const info = "Results"
        console.log("this.props.route.params.results", this.props.route.params.results)

        const calculate = this.calculateMonthlyPayment(this.props.route.params.results)
        const res = this.monthlyForDisplay(this.props.route.params.results)

        return(
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
              Results:
              </Text>
            </Text>
          </Body>
        </Header>
            <View style={styles.fullScreen}>
                <ScrollView contentContainerStyle={styles.contentContainer}>
                    <Summary info={this.props.route.params.results} res={res}>{console.log(res,"testtsss")}</Summary>
                    <Text style={styles.title}>Loan Schedule:</Text>
                    <View style={styles.paymentRow}>
                        {/* <Text style={styles.itemNumber} key={0}>#</Text> */}
                        <Text style={styles.item} key={1}>Interest:</Text>
                        <Text style={styles.item} key={2}>Principal:</Text>
                        <Text style={styles.item} key={3}>Balance:</Text>
                    </View>
                    <View>{calculate.map((payment, i) => {
                        return <View style={styles.paymentRow}>
                                <Text style={styles.itemNumber} key={payment[0]}>{payment[0]}</Text>
                                <Text style={styles.item} key={payment[0]}>${payment[1]}</Text>
                                <Text style={styles.item} key={payment[0]}>${payment[2]}</Text>
                                <Text style={styles.item} key={payment[0]}>${payment[3]}</Text>
                             </View>
                    })}</View>
                    {/* <View style={styles.ad}>

                    </View> */}
                </ScrollView>
            </View>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    fullScreen: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
        alignSelf: 'center',
    },
    item: {
        color: 'black',
        width: 85,
        marginLeft: 4,
    },
    itemNumber: {
        color: 'black',
        width: 45,
        marginLeft: 4,
    },
    paymentRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        // borderWidth: 1,
        marginBottom: 1,
        borderRadius: 50,
        paddingLeft: 10,
    },
    contentContainer: {
        paddingTop: 10,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    title: {
        color: '#D75452',
        fontWeight: 'normal',
        fontSize: 25,
    },
})