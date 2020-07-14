import React from "react";
import { connect } from "react-redux";
import { Text, Container } from "native-base";

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
    };
  }
  componentDidMount() {
    console.log(this.props);
  }
  render() {
    return (
      <Container>
        <Text>{this.props.user.email}</Text>
        <Text>{this.props.user.firstName}</Text>
        <Text>{this.props.user.firstName}</Text>
      </Container>
    );
  }
}

const mapState = (state) => {
  console.log(state);
  return {
    user: state.user,
  };
};

export default connect(mapState)(Settings);
