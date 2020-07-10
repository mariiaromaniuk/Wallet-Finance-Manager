import React, { Component } from "react";
import { Container, Text, Item, Form, Input, Button, Label } from "native-base";
import { connect } from "react-redux";
import { View, TextInput } from "react-native";
import { withNavigation } from "react-navigation";
import { signup } from "../../store/user";

const TextInputComponent = ({ value, onChangeText, name, ...props }) => (
  <TextInput
    value={value}
    onChangeText={(value) => onChangeText(name, value)} //... Bind the name here
    {...props}
  />
);

class SignUpScreen extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      email: "",
      password: "",
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnSignUp = this.handleOnSignUp.bind(this);
  }

  handleOnChange(name, value) {
    let change = {};
    switch (name) {
      case "username":
        change = { ...this.state, username: value };
        break;
      case "email":
        change = { ...this.state, email: value };
        break;
      case "password":
        change = { ...this.state, password: value };
        break;
      case "confirmPassword":
        change = { ...this.state, confirmPassword: value };
        break;
      default:
        change = { ...this.state };
    }
    this.setState(change);
  }

  handleOnSignUp() {
    const email = this.state.email;
    const password = this.state.password;
    // Error begins in the line below
    this.props.handleSubmit(email, password);
    this.props.navigation.navigate("Link Bank");
  }

  render() {
    return (
      <View
      //   style={styles.container}
      >
        <Text>WALLET</Text>

        <Text>Username: </Text>
        <TextInputComponent
          //   style={styles.inputStyle}
          name="username"
          value={this.state.value}
          placeholder="Username"
          onChangeText={this.handleOnChange}
        ></TextInputComponent>
        <Text>Email: </Text>
        <TextInputComponent
          //   style={styles.inputStyle}
          name="email"
          value={this.state.value}
          placeholder="Email"
          onChangeText={this.handleOnChange}
        ></TextInputComponent>
        <Text>Password: </Text>
        <TextInputComponent
          //   style={styles.inputStyle}
          name="password"
          value={this.state.value}
          placeholder="Password"
          onChangeText={this.handleOnChange}
        ></TextInputComponent>
        <Text>Confirm Password: </Text>
        <TextInputComponent
          //   style={styles.inputStyle}
          name="confirmPassword"
          value={this.state.value}
          placeholder="Confirm Password"
          onChangeText={this.handleOnChange}
        ></TextInputComponent>
        <Button title="Sign Up" onPress={() => this.handleOnSignUp()}></Button>
      </View>
    );
  }
}

// import { render } from "react-dom";

// export class Signup extends Component{
//   constructor(props){
//   super(props);
//   this.state = {firstName:"",lastName:"",email:"", password:""}
//   }
//   render(){
//     return (
//       <Container>
//         <Form>
//         <Item floatingLabel>
//           <Label>First Name</Label>
//           <Input
//           onChangeText={text=> this.setState({firstName: text})}
//           />
//         </Item>
//         <Item floatingLabel>
//           <Label>Last Name</Label>
//           <Input
//           onChangeText={text=> this.setState({lastName: text})}
//           />
//         </Item>
//         <Item floatingLabel>
//           <Label>Email</Label>
//           <Input
//           onChangeText={text=> this.setState({email: text})}
//           />
//         </Item>
//         <Item floatingLabel secureTextEntry>
//           <Label>Password</Label>
//           <Input
//           onChangeText={text=> this.setState({password: text})}
//           />
//         </Item>
//       </Form>
//       <Button
//         block
//         style={{margin:20, marginTop:40}}
//         success
//         onPress={()=>{
//           console.log(this.state)
//           this.props.navigation.reset({
//           index:0,
//           routes:[{name: 'Link'}]
//         })}}
//       >
//         <Text>SIGNUP</Text>
//       </Button>
//       </Container>
//     );
//   }

// }

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(email, password) {
      dispatch(signup(email, password));
    },
  };
};
// const wrappedSignUpScreen = withNavigation(SignUpScreen);
export default connect(null, mapDispatch)(SignUpScreen);
