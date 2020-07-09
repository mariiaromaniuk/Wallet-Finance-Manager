import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import PlaidAuthenticator from 'react-native-plaid-link';
import { connect } from 'react-redux';
import { sendToken } from '../../store/token';

class Link extends React.Component {
  state = {
    data: {},
    status: 'LOGIN'
  };

  render() {
    // Status: CONNECTED|EVENT|ACKOWLEDGE|EXIT|LOGIN
    switch(this.state.status) {
      case 'CONNECTED':
        return this.renderDetails()
      case 'LOGIN':
      case 'EXIT':
        return this.renderButton();
      default:
        return this.renderLogin();
    }
  }

  renderLogin() {
    return (
      <PlaidAuthenticator
        onMessage={this.onMessage}
        client='Wallet'
        publicKey="e192da42c496ba424b0a39f9cdb07a"
        env="sandbox"
        product="auth,transactions"
      />
    );
  }

  renderButton = () => {
    return <View style={styles.container}>
      <TouchableOpacity onPress={() => this.setState({status: ''})}>
        <Text style={styles.paragraph}>Login with Plaid</Text>
      </TouchableOpacity>
    </View>
  }

  renderDetails() {
    console.log('Public token ==============', this.state.data.metadata.public_token)
    this.props.sendToken(this.state.data.metadata.public_token);
    return (
      <View style={styles.container}>
        <Text>This shows after plaid is connected and we get the Public key from user</Text>
      </View>
    );
  }

  onMessage = data => {
    this.setState({
      data,
      status: data.action.substr(data.action.lastIndexOf(':') + 1).toUpperCase()
    });
  };
}

const mapDispatch = dispatch => {
  return {
    sendToken: token => dispatch(sendToken(token))
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 24,
    backgroundColor: '#ecf0f1'
  },
  paragraph: {
    fontSize: 18,
    marginBottom: 5,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e'
  },
  value: {
    marginBottom: 20,
    textAlign: 'center'
  }
});

export default connect(
  null,
  mapDispatch
)(Link);