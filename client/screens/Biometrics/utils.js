import * as LocalAuthentication from "expo-local-authentication";
import { FINGERPRINT, FACEID } from "./constants";

export const getSupportedBioTypes = async () => {
  let authtypes = await LocalAuthentication.supportedAuthenticationTypesAsync();
  if (authtypes.length == 0) 
    return null;
  const [fingerprint, faceId] = authtypes;
  return {
    [FINGERPRINT]: fingerprint ? true : false,
    [FACEID]: faceId ? true : false
  };
};

export const isBiometricsSupported = async () => {
  return await LocalAuthentication.isEnrolledAsync();
};

export const getLatestUser = async () => {
    try {
      const username = await AsyncStorage.getItem("username");
      const password = await AsyncStorage.getItem("password");
      if (username && password) return { username, password };
    } catch (err) {
      console.log(err);
    }
    return false;
};
  
export const latestUserExists = async () => {
    return (await getLatestUser()) ? true : false;
};
  
export const updateLatestUser = async (username, password) => {
    try {
      await AsyncStorage.setItem("username", username);
      await AsyncStorage.setItem("password", password);
    } catch (err) {
      console.log(err);
    }
};