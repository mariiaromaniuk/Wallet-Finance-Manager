import React from 'react'
import { View, Text, StyleSheet} from 'react-native'

const Summary = (props) => {
    const { info, res } = props
    return(
        <View style={styles.fullScreen}>
            <View style={styles.sides}>
                <View style={styles.columns}>
                    <Text style={styles.title}>Loan Info: </Text>
                    <Text style={styles.items}>Amount: </Text>
                    <Text style={styles.text}>${info.amount}</Text>
                    <Text style={styles.items}>Loan Term:</Text>
                    <Text style={styles.text}>{info.loanTerm} {info.timeUnit}</Text>
                    <Text style={styles.items}>Interest:</Text>
                    <Text style={styles.text}>{info.interest} %</Text>
                </View>
                <View style={styles.columns}>
                    <Text style={styles.title}>Summary:</Text>
                    <Text style={styles.items}>Monthly Payment:</Text>
                    <Text style={styles.text}>${res[0]}</Text>
                    <Text style={styles.items}>Total With Interest:</Text>
                    <Text style={styles.text}>${res[1]}</Text>
                    <Text style={styles.items}>Interest Paid:</Text>
                    <Text style={styles.text}>${res[2]}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    fullScreen: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'flex-start',
        // marginTop: 20,
        // marginBottom: 20,
        backgroundColor: '#000E23',
        // alignSelf: 'stretch',
        // width: width,
    },
    text: {
        color: 'white',
        backgroundColor: 'red',
        marginVertical: 5,
        marginHorizontal: 4,
        height: 28,
        width: 180,
        borderRadius: 50,
        textAlignVertical: 'center',
        textAlign: 'center',
        justifyContent: 'center',
    },
    title: {
        color: 'white',
        fontWeight: 'normal',
        fontSize: 30,
        // marginHorizontal: 35,
    },
    sides: {
        display: 'flex',
        flexDirection: 'row',
    },
    columns: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    items: {
        color: 'white'
    }
})

export default Summary