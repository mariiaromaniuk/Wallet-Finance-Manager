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

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    };
  }
  componentDidMount() {
    this.setState({
      firstName: this.props.user.firstName,
      lastName: this.props.user.lastName,
      email: this.props.user.email,
      editUser: "false",
    });
  }
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
          <Body>
            <Title
              style={{ fontSize: 20, fontWeight: "bold", color: "#fc5185" }}
            >
              User Settings
            </Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Text>
            This component could show options to activate/deactivate
            notifications and something else
          </Text>
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

export default connect(mapState, mapDispatch)(Settings);
