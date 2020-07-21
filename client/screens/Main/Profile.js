import React from "react";
import { connect } from "react-redux";
import { Text, Container, Content, Button, Header, Body, Image } from "native-base";
import moment from "moment";
import { FontAwesome } from "@expo/vector-icons";
import { logout } from "../../store/user";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      joined: "",
    };
  }
  componentDidMount() {
    this.setState({
      firstName: this.props.user.firstName,
      lastName: this.props.user.lastName,
      email: this.props.user.email,
      joined: moment(this.props.user.createdAt).format("MM-YYYY"),
    });
  }
  render() {
    return (
      <Container>
        <Header
          iosBarStyle
          androidStatusBarColor
          style={{ backgroundColor: "#222831", height: 100 }}
          span
        >
          <Body
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 30,
                fontWeight: "bold",
                color: "#fc5185",
              }}
            >
              {this.state.firstName} {this.state.lastName}
            </Text>

            <Text
              style={{
                color: "white",
              }}
            >
              {this.state.email}
            </Text>
          </Body>
        </Header>
        <Content>
          <Text
            style={{
              fontWeight: "bold",
              alignSelf: "center",
              paddingTop: 25,
              marginBottom: 30,
            }}
          >
            <Text style={{ color: "#D75452", fontSize: 20 }}>Wallet </Text>
            <Text style={{ color: "#222831", fontSize: 20}}>member since </Text>
            <Text style={{ color: "#D75452", fontSize: 20 }}>

              {this.state.joined}
            </Text>
          </Text>
          <Button
            block
            onPress={() => this.props.navigation.navigate("Link")}
            primary
            style={{
              margin: 10,
              marginLeft: 22,
              marginRight: 22,
              backgroundColor: "#6CBDC3",
            }}
          >
            <Text style={{ fontWeight: "bold" }}>Link Bank Account</Text>
          </Button>

          <Button
            block
            onPress={() => this.props.navigation.navigate("Calculator")}
            primary
            style={{
              margin: 10,
              marginLeft: 22,
              marginRight: 22,
              backgroundColor: "#6CBDC3",
            }}
          >
            <Text style={{ fontWeight: "bold" }}>Loan Calculator</Text>
          </Button>

          <Button
            block
            primary
            onPress={() => this.props.navigation.navigate("PasswordReset")}
            style={{
              margin: 10,
              marginLeft: 22,
              marginRight: 22,
              backgroundColor: "#6CBDC3",
            }}
          >
            <Text style={{ fontWeight: "bold" }}>Change Password</Text>
          </Button>
          <Button
            block
            danger
            style={{
              margin: 10,
              marginLeft: 22,
              marginRight: 22,
            }}
          >
            <FontAwesome name="power-off" size={24} color="white" />
            <Text style={{ fontWeight: "bold" }}>Logout</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

const mapState = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatch = (dispatch) => {
  return {
    logout: (navigation) => dispatch(logout(navigation)),
  };
};

export default connect(mapState, mapDispatch)(Profile);
