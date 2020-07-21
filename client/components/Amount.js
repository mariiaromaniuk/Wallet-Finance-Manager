import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';


const Amount = (props) => {
    const {amountEntered, change} = props
    return(
            <View style={styles.inputView}>
                <TextInput
                    style={styles.input}
                    // selectionColor={color: 'red'}
                    onChangeText={(amountEntered) => change(amountEntered)}
                    keyboardType='numeric'
                    placeholder='$5,000'>
                </TextInput>
            </View>
    )
}

const styles = StyleSheet.create({
   inputView: {
       backgroundColor: "white",
       borderRadius: 8,
       width: 360,
       height: 50,
   },
   input: {
       borderRadius: 8,
       textAlign: 'center',
       alignItems: 'center',
       flex: 1,
       borderWidth: 1,
       borderColor: "#999999",
       fontSize: 18,
   },
})

export default Amount;