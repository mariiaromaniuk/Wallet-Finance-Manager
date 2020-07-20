import React from 'react'
import { StyleSheet, View, Picker, TextInput } from 'react-native'
import { Text, Input } from 'react-native-elements'

const LoanTerm = (props) => {
    const { lengthEntered, change, changeTime } = props
    return(
        <View style={styles.horizontal}>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.input}
                    onChangeText={(length) => change(length)}
                    keyboardType = 'number-pad'
                    placeholder='6'>
                </TextInput>
            </View>
            <View tyle={styles.pickerView}>
                <View style={styles.pickerViewLoanTerm}>
                    <Picker
                      selectedValue={lengthEntered.timeUnit}
                      style={styles.picker}
                      onValueChange={(itemValue, itemIndex) =>
                        changeTime(itemValue)
                    }>
                    <Picker.Item color='gray' label="Length" />
                    <Picker.Item label="Month(s)" value="months" />
                    <Picker.Item label="Year(s)" value="years" />
                  </Picker>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
       inputView: {
               backgroundColor: "white",
               width: 205,
               borderRadius: 10,
           },
           pickerViewLoanTerm: {
               marginLeft: 15,
               borderRadius: 10,
               color: 'white',
               backgroundColor: 'white',
               overflow: 'hidden',
               width: 140
           },
           input: {
               borderRadius: 10,
               textAlign: 'center',
               alignItems: 'center',
               flex: 1,

           },
           pickerView: {
               // width: 130, 
               // height: 150
           },
           horizontal: {
               display: 'flex',
               flexDirection: 'row'
           },
           picker: {
               color: 'white',
           }
})

export default LoanTerm