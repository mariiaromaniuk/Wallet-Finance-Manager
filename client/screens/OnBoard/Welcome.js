import React, { Component } from "react";
import { View, Text, TextInput, Button, Image, TouchableOpacity, ImageBackground } from "react-native";
import { connect } from "react-redux";


export function WelcomeScreen({ navigation }) {
    return (
      <View style={styles.container}>
        <View style={styles.logoLocation}>
          <Image
            style={styles.logo}
            source={require('../../../assets/logo.png')}
          />
          <Text style={styles.text}>WELCOME TO WALLET!</Text>
        </View>
        <View>
          <Button style={styles.button}
            title="Link Your Bank Account"
            onPress={() => navigation.navigate("Link Bank")}>
          </Button>
        </View>
      </View>
    );
}


const styles = {
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
    logoLocation: {
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      top: -100,
    },
    logo: {
      width: 220,
      height: 220,
      resizeMode: 'contain',
    },
    text: {
      alignSelf: 'center',
      padding: 20,
      color: "red",
      fontWeight: 'bold',
      fontSize: 25,
    },
    button: {
      backgroundColor: "gray",
      height: 50,
      width: 100,
      padding: 10,
      alignSelf: 'center',
    },
  };
