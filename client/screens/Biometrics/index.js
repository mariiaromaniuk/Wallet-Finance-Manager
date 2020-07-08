import React, { Component } from "react";
import { View, Text, Platform, TouchableOpacity } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import { 
    getSupportedBioTypes, 
    isBiometricsSupported, 
    latestUserExists, 
    updateLatestUser 
} from "./utils";
import {
  MAX_ATTEMPTS,
  MAX_ATTEMPTS_REACHED_MSG,
  DEFAULT_LOCKOUT_ERR,
  FINGERPRINT_PROMPT,
  FACEID_PROMPT,
  DEFAULT_CANCEL_ERR
} from "./constants";
import { Icon, Toast } from "@ant-design/react-native";
import Modal from "react-native-modal";


export default class Biometrics extends Component {
  state = {
    sensorPrompt: "",
    error: "",
    authenticated: false,
    modalVisible: false,
    attemptsRemaining: MAX_ATTEMPTS,
    enableBiometrics: true,
    latestUser: false
  };

  setModalVisible = async visible => {
    if (!visible && Platform.OS == "android")
      LocalAuthentication.cancelAuthenticate();
    this.setState({ modalVisible: visible });
  };

  clearState = () => {
    this.setState({ authenticated: false, failedCount: 0 });
  };

  scanFingerPrint = async () => {
    try {
      let results = await LocalAuthentication.authenticateAsync();
      if (results.success) {
        this.onAuthSuccess();
      } else {
        this.onAuthFail(results);
      }
    } catch (err) {
      console.log(err);
    }
  };

  onAuthFail = results => {
    let outputError = "";
    const { error, message } = results;
    const { attemptsRemaining } = this.state;
    let newAttemptsRemaining = attemptsRemaining - 1;

    if (newAttemptsRemaining == 0) {
      outputError = MAX_ATTEMPTS_REACHED_MSG;
    } else if (error && message) {
      outputError = message;
      if (error == DEFAULT_LOCKOUT_ERR) outputError = MAX_ATTEMPTS_REACHED_MSG;
      else if (error == DEFAULT_CANCEL_ERR) {
        newAttemptsRemaining++;
        outputError = "";
      }
    }

    this.handleError(outputError, newAttemptsRemaining);

    this.setState({
      attemptsRemaining: newAttemptsRemaining,
      modalVisible: false,
      error: outputError
    });
  };

  handleError = (error, attemptsRemaining) => {
    if (attemptsRemaining < MAX_ATTEMPTS) {
      if (Platform.OS == "android") LocalAuthentication.cancelAuthenticate();
      Toast.fail(error || "Failed to authenticate, please try again");
    }
  };

  onAuthSuccess = () => {
    this.setState({
      modalVisible: false,
      authenticated: true,
      attemptsRemaining: MAX_ATTEMPTS
    });
    this.props.logIn();
  };

  updateSensorPrompt = ({ fingerprint, faceId }) => {
    let { sensorPrompt } = this.state;
    if (fingerprint && faceId) {
      sensorPrompt = `${FINGERPRINT_PROMPT} or\n${FACEID_PROMPT}`;
    } else {
      if (fingerprint) {
        sensorPrompt = `${FINGERPRINT_PROMPT}`;
      } else if (faceId) {
        sensorPrompt = `${FACEID_PROMPT}`;
      }
    }
    this.setState({ sensorPrompt });
    return true;
  };

  supportedAuthenticationTypes = async () => {
    const supportedTypes = await getSupportedBioTypes();
    return supportedTypes ? this.updateSensorPrompt(supportedTypes) : false;
  };

  verifyBiometrics = async () => {
    try {
      const isSupported = await isBiometricsSupported();
      return isSupported ? await this.supportedAuthenticationTypes() : false;
    } catch (err) {
      console.log(err);
    }
  };

  componentDidMount = async () => {
    const latestUser = await latestUserExists();
    if (!(await this.verifyBiometrics()))
      this.setState({ enableBiometrics: false });
    this.setState({ latestUserExists: latestUser });
  };

  onBiometricsPressed = async () => {
    const {
      enableBiometrics,
      latestUserExists,
      authenticated,
      error,
      attemptsRemaining,
      modalVisible
    } = this.state;

    if (!enableBiometrics) Toast.fail("Phone does not support biometrics");
    else if (authenticated || !latestUserExists)
      Toast.fail("Login first to enable biometrics");
    else if (attemptsRemaining == 0) {
      Toast.fail(MAX_ATTEMPTS_REACHED_MSG);
    } else if (error == "" || attemptsRemaining != 0) {
      if (Platform.OS === "android") {
        this.setModalVisible(!modalVisible);
      } else {
        this.scanFingerPrint();
      }
    }
  };

  render() {
    const { modalVisible, sensorPrompt, attemptsRemaining } = this.state;
    const { loading } = this.props;
    return (
      <View>
        <TouchableOpacity
          disabled={loading}
          style={{ paddingHorizontal: 25, paddingVertical: 15 }}
          onPress={() => {
            this.onBiometricsPressed();
          }}
        >
          <Icon size="lg" name="scan" color={loading ? "#95A5A6" : "#061178"} />
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          isVisible={modalVisible}
          onShow={this.scanFingerPrint}
          onBackButtonPress={() => {
            this.setModalVisible(false);
          }}
          onBackdropPress={() => {
            this.setModalVisible(false);
          }}
        >
          <View style={styles.modal}>
            <View style={styles.innerContainer}>
              <Text style={styles.modalText}>{sensorPrompt}</Text>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}