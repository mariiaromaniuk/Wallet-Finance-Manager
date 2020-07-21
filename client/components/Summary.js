import React from 'react';
import { View, Text, StyleSheet} from 'react-native';


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
        borderRadius: 8,
        marginTop: 10,
        marginBottom: 20,
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 5,
        paddingRight: 5,
        backgroundColor: '#F2F2F2',
        // alignSelf: 'stretch',
    },
    text: {
        color: 'black',
        backgroundColor: 'white',
        marginVertical: 5,
        marginHorizontal: 4,
        height: 28,
        width: 180,
        borderRadius: 8,
        textAlignVertical: 'center',
        textAlign: 'center',
        justifyContent: 'center',
        borderRadius: 20,
    },
    title: {
        color: '#D75452',
        fontWeight: 'normal',
        fontSize: 25,
        // marginHorizontal: 35,
    },
    sides: {
        display: 'flex',
        flexDirection: 'row',
    },
    columns: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    items: {
        color: 'black'
    }
})

export default Summary;