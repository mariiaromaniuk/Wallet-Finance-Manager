import React from "react";
import { connect } from "react-redux";
import {
  Text,
  Container,
  Content,
  Button,
  Header,
  Left,
  Body,
  Icon,
  Title,
  Form,
  Right,
  InputGroup,
  Input,
} from "native-base";
import { logout } from "../../store/user";
import { FA5Style } from "@expo/vector-icons/build/FontAwesome5";

class ResetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      passwordComfirmed: "",
      passwordsMatch: true,
    };
  }
  componentDidMount() {}
  render() {
    return (
      <Container>
        <Header
          iosBarStyle
          androidStatusBarColor
          style={{ backgroundColor: "#222831" }}
        >
          <Left>
            <Button
              transparent
              style={{ marginLeft: 10 }}
              onPress={() => this.props.navigation.goBack()}
            >
              <Icon name="arrow-back" style={{ color: "red", fontSize: 25 }} />
            </Button>
          </Left>
          <Body></Body>
          <Right />
        </Header>
        <Content>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 25,
              alignSelf: "center",
              marginTop: 80,
            }}
          >
            Change your password
          </Text>
          <Form style={{ padding: 20, marginTop: 20 }}>
            <InputGroup>
              <Icon name="ios-unlock" />
              <Input
                placeholder="New Password"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={true}
                onChangeText={(text) => this.setState({ password: text })}
              />
            </InputGroup>
            <InputGroup>
              <Icon name="ios-unlock" />
              <Input
                placeholder="Comfirm Password"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={true}
                onChangeText={(text) =>
                  this.setState({ passwordComfirmed: text })
                }
              />
            </InputGroup>
          </Form>
          {this.state.passwordsMatch ? null : (
            <Text
              style={{ alignSelf: "center", fontWeight: "bold", color: "red" }}
            >
              !! Passwords dont match, please try again !!
            </Text>
          )}
          <Button
            block
            style={{ margin: 20, marginTop: 20 }}
            onPress={() => {
              this.state.password === this.state.passwordComfirmed
                ? console.log("add Update user to store")
                : this.setState({ passwordsMatch: false });
            }}
            danger
          >
            <Text
              style={{
                fontWeight: "bold",
              }}
            >
              CHANGE PASSWORD
            </Text>
          </Button>
          <Button
            block
            style={{ margin: 20, marginTop: 5 }}
            onPress={() => {
              this.props.navigation.goBack();
            }}
            primary
          >
            <Text
              style={{
                fontWeight: "bold",
              }}
            >
              CANCEL
            </Text>
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

export default connect(mapState, mapDispatch)(ResetPassword);
