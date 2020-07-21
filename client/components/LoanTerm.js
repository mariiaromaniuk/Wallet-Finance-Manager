import React from 'react';
import { StyleSheet, View, Picker, TextInput } from 'react-native';


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
               borderRadius: 8,
               borderWidth: 1,
               borderColor: "#999999"
           },
           pickerViewLoanTerm: {
               marginLeft: 15,
               borderRadius: 8,
               backgroundColor: 'white',
               overflow: 'hidden',
               width: 140,
               borderWidth: 1,
               borderColor: "#999999"
           },
           input: {
               borderRadius: 8,
               textAlign: 'center',
               alignItems: 'center',
               flex: 1,
               fontSize: 16,
           },
           horizontal: {
               display: 'flex',
               flexDirection: 'row'
           },
           picker: {
               color: 'white',
           }
})

export default LoanTerm;