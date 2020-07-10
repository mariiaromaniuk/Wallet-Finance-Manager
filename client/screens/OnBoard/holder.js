import React from "react";
import { Provider } from "react-redux";
import { StyleSheet, Text} from "react-native";
import {createStackNavigator, createSwitchNavigator} from 'react-navigation'
import {
  Link,
  Login,
  Signup,
  First
} from './client'
import store from "./client/index";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isReady: false,
    };
  }

  async componentDidMount() {
    // await Font.loadAsync({
    //   Roboto: require('native-base/Fonts/Roboto.ttf'),
    //   Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
    //   ...Ionicons.font,
    // });
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    return (
        <Provider store={store}>
          <AppNavigator />
        </Provider>
    );
  }
}

const AuthNavigator = createStackNavigator({
  Login: {screen: Login},
  Signup:{screen: Signup},
  Link:{screen: Link}
})

const AppNavigator = createSwitchNavigator({
  Auth: {screen: AuthNavigator},
  Main:{screen: Navbar}
})