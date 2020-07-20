import React from 'react'
import { View, StyleSheet, TextInput, Text } from 'react-native'
// import { Picker } from 'react-native-elements'

state = { language: true };

const InterestRate = (props) => {
    const { interestEntered, changeInterest } = props
    return(
        <View style={styles.horizontal}>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.input}
                    onChangeText={(apr) => changeInterest(apr)}
                    placeholder='9.3'
                    keyboardType = 'number-pad'
                >
                </TextInput>
                {/* <Text>{console.log(interestEntered, "interest test")}</Text> */}
            </View>
            <View style={styles.picker}>
                <Text style={styles.percentage}>%</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    inputView: {
            marginTop: 5,
            // underlineColorAndroid: 'transparent',
            backgroundColor: "white",
            width: 205,
            // height: 50,
            borderRadius: 50,
        },
        input: {
            borderRadius: 50,
            textAlign: 'center',
            alignItems: 'center',
            flex: 1,
            // height: 30
        },
        picker: {
            backgroundColor: '#2608B1',
            height: 45,
            borderRadius: 50,
            marginTop: 5,
            marginLeft: 15,
            color: 'white',
            width: 140,
            textAlign: 'center',
            justifyContent: 'center',
            alignItems: 'center'
        },
        horizontal: {
            display: 'flex',
            flexDirection: 'row',
            height: 50
        },
        percentage: {
            color: 'white',
            textAlign: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            fontWeight: 'bold'
        }
})

export default InterestRate