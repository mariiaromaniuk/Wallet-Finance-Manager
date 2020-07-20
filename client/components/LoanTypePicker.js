import React from 'react'
import { View, StyleSheet, Picker } from 'react-native'
// import { Picker } from 'react-native-elements'

const LoanTypePicker = (props) => {
    const { change, loanState } = props
    return(
        <View style={styles.pickerView}>
            <View style={styles.pickerViewLoanType}>
                <Picker
                    selectedValue={loanState.loanType}
                    style={styles.picker}
                    onValueChange={(itemValue, itemIndex) =>
                        change(itemValue)
                    }
                    >
                    <Picker.Item label="Personal Loan" value="personal" />
                    <Picker.Item label="Auto Loan" value="auto" />
                </Picker>
            </View>
        </View>
    )
}
// console.log(this.state)

const styles = StyleSheet.create({
    loanTitle: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 35,
        marginTop: 5
    },
    picker: {
        height: 50,
        width: 360,
        backgroundColor: '#2608B1',
        color: 'white',
    },
    pickerView: {
        borderRadius: 50,
        borderColor: '#bdc3c7',
        overflow: 'hidden',
    },
    pickerViewLoanType: {
        // marginLeft: 15,
        // borderRadius: 50,
        // color: 'white',
        // backgroundColor: '#2608B1',
        // borderWidth: 1,
        // overflow: 'hidden',
        // width: 140
           },
})

export default LoanTypePicker


// import React, { Component } from 'react';
// import { Text, Picker, View, StyleSheet } from 'react-native';

// export default class LoanTypePicker extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { text: 'Useless Placeholder' };
//   }

//   render() {
//     return (
//          <View style={styles.pickerView}>
//             <View style={styles.pickerViewLoanType}>
//                 <Picker
//                     selectedValue={this.state.language}
//                     style={styles.picker}
//                     onValueChange={(itemValue, itemIndex) =>
//                         this.setState({language: itemValue
//                         })
//                     }>
//                     <Picker.Item label="Personal Loan" value="personal" />
//                     <Picker.Item label="Auto Loan" value="auto" />
//                 </Picker>
//                 <Text>{console.log(this.state)}</Text>
//             </View>
//         </View>
//     );
//   }
// }
// const styles = StyleSheet.create({
//     loanTitle: {
//         color: 'white',
//         fontWeight: 'bold',
//         fontSize: 35,
//         marginTop: 5
//     },
//     picker: {
//         height: 50,
//         width: 360,
//         backgroundColor: '#2608B1',
//         color: 'white',
//     },
//     pickerView: {
//         borderRadius: 50,
//         borderColor: '#bdc3c7',
//         overflow: 'hidden',
//     },
//     pickerViewLoanType: {
//         // marginLeft: 15,
//         // borderRadius: 50,
//         // color: 'white',
//         // backgroundColor: '#2608B1',
//         // borderWidth: 1,
//         // overflow: 'hidden',
//         // width: 140
//            },
// })