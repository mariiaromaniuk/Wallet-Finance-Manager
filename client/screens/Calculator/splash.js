import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'



export default class Splash extends React.Component {
    render(){
        const { navigate } = this.props.navigation
        return(
            <View style={styles.fullScreen}>
            <TouchableOpacity style={styles.screenPress} onPress={() => navigate('Loan')}>
                
                <View style={styles.titleContainer}>
                    <Text onPress={() => navigate('Loan')} style={styles.title}>Your Loan Calculator</Text>
                </View>
                {/* <Text style={styles.title}>Logo</Text> */}
                <Text style={{color: 'white', marginBottom: 35}}>Click Anywhere to Continue</Text>
            </TouchableOpacity>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    fullScreen: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        // marginTop: 10,
        // marginBottom: 20,
        backgroundColor: '#000E23'
    },
    screenPress: {
        alignItems: 'center'
    },
    title: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 30,
    },
    titleContainer: {
        marginTop: 200,
        marginBottom: 15,
    },
    logoView: {
        height: 70,
        width: 70,
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center'
    },
    logoImg: {
        height: 210,
        width: 210,
    }
})