import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { Container, Button} from "native-base";
import PlaidAuthenticator from "react-native-plaid-link";
import { connect } from "react-redux";
import { sendToken } from "../../store/token";


class Link extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      status: "LOGIN",
    };
  }

  render() {
    // Status: CONNECTED|EVENT|ACKOWLEDGE|EXIT|LOGIN
    switch (this.state.status) {
      case "CONNECTED":
        return this.renderDetails();
      case "EXIT":
        return this.renderButton();
      default:
        return this.renderLogin();
    }
  }

  renderLogin() {
    return (
      <PlaidAuthenticator
        onMessage={this.onMessage}
        client="Wallet"
        publicKey="e192da42c496ba424b0a39f9cdb07a"
        env="sandbox"
        product="auth,transactions"
      />
    );
  }

  renderButton = () => {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.setState({ status: "" })}>
          <Text style={styles.paragraph}>
            Link Bank account to start using Wallet
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  renderDetails() {
    this.props.sendToken(this.state.data.metadata.public_token);
    return (
      <Container style={styles.container}>
        <Text               
        style={{
            color: "#303030",
            alignSelf: "center",
            fontSize: 40,
            fontWeight: "bold",
          }}>Welcome to Wallet!</Text>
        <Text               
        style={{
            marginTop: 8,
            color: "#303030",
            alignSelf: "center",
            fontSize: 23,
            fontWeight: "bold",
          }}>Your Personal Finance Manager</Text>
          <Image
            style={styles.logo}
            source={require('../../../assets/wallet.gif')}
          />
        <Button
          onPress={() => this.props.navigation.navigate("Dashboard")}
          primary
          style={{
            margin: 10, marginBottom: 40, backgroundColor: "#6CBDC3",
          }}
        >
          <Text style={styles.categoryText}>Take me to Dashboard</Text>
        </Button>
      </Container>
    );
  }

  onMessage = (data) => {
    this.setState({
      data,
      status: data.action
        .substr(data.action.lastIndexOf(":") + 1)
        .toUpperCase(),
    });
  };
}

const mapDispatch = (dispatch) => {
  return {
    sendToken: (token) => dispatch(sendToken(token)),
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10,
    backgroundColor: "#6CBDC3",
  },
  paragraph: {
    fontSize: 18,
    marginBottom: 5,
    fontWeight: "bold",
    textAlign: "center",
    color: "#34495e",
  },
  value: {
    marginBottom: 20,
    textAlign: "center",
  },
  logo: {
    width: 400,
    height: 400,
    resizeMode: 'contain',
  },
  text: {
    alignSelf: 'center',
    paddingTop: 15,
    padding: 8,
    color: "#D16C58",
    fontWeight: 'bold',
    fontSize: 40,
  },
  categoryText: {
    alignSelf: 'center',
    color: '#000000',
    fontWeight: 'normal',
    fontSize: 20,
  },

});

export default connect(null, mapDispatch)(Link);
