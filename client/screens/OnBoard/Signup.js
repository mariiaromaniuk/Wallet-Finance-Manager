import React, { Component } from "react";
import { Container, Text, Item, Form, Input, Button, Label } from "native-base";
import { connect } from "react-redux";
import { render } from "react-dom";

export class Signup extends Component{
  constructor(props){
  super(props);
  this.state = {firstName:"",lastName:"",email:"", password:""}
  }
  render(){
    return (
      <Container>
        <Form>
        <Item floatingLabel>
          <Label>First Name</Label>
          <Input
          onChangeText={text=> this.setState({firstName: text})}
          />
        </Item>
        <Item floatingLabel>
          <Label>Last Name</Label>
          <Input
          onChangeText={text=> this.setState({lastName: text})}
          />
        </Item>
        <Item floatingLabel>
          <Label>Email</Label>
          <Input
          onChangeText={text=> this.setState({email: text})}
          />
        </Item>
        <Item floatingLabel secureTextEntry>
          <Label>Password</Label>
          <Input
          onChangeText={text=> this.setState({password: text})}
          />
        </Item>
      </Form>
      <Button
        block
        style={{margin:20, marginTop:40}}
        success
        onPress={()=>{
          console.log(this.state)
          this.props.navigation.reset({
          index:0,
          routes:[{name: 'Link'}]
        })}}
      >
        <Text>SIGNUP</Text>
      </Button>
      </Container>
    );
  }

}

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(email, password) {
      dispatch(SignUpScreen(email, password));
    },
  };
};

export default connect(null, mapDispatch)(Signup);
