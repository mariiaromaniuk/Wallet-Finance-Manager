import axios from "axios";
import { server } from "../server";

//ACTION TYPES

const GET_USER = "GET_USER";
const REMOVE_USER = "REMOVE_USER";

//INITIAL STATE

const initialDefaultUser = {};

//ACTION CREATORS
const getUser = (user) => ({ type: GET_USER, user });
const removeUser = () => ({ type: REMOVE_USER });

/**
 * THUNK CREATORS
 */

export const login = (email, password, navigation) => {
  return async (dispatch) => {
    try {
      let user = await axios.post(`${server}/auth/login`, { email, password });
      dispatch(getUser(user.data));
      navigation.navigate("Dashboard");
    } catch (error) {
      console.error("There was an Error", error);
    }
  };
};

export const signup = (userInput, navigation) => {
  return async (dispatch) => {
    try {
      let user = await axios.post(`${server}/auth/signup`, userInput);
      dispatch(getUser(user.data));
      navigation.navigate("Link");
    } catch (error) {
      return error;
    }
  };
};

export const logout = (navigation) => {
  return async (dispatch) => {
    try {
      await axios.post(`${server}/auth/logout`);
      dispatch(removeUser());
      navigation.navigate("initial");
    } catch (error) {
      console.error(error);
    }
  };
};

export default function (state = initialDefaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user;
    case REMOVE_USER:
      return defaultUser;
    default:
      return state;
  }
}
