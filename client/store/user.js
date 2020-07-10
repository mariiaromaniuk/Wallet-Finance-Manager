import axios from "axios";
import { server } from "../index";

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

export const signup = (email, password) => {
  return async (dispatch) => {
    try {
      console.log(email, password);
      const firstName = "j";
      const lastName = "m";
      //   Line below fails
      let user = await axios.post(`${server}/auth/signup`, {
        firstName,
        lastName,
        email,
        password,
      });
      console.log("USER", {
        firstName,
        lastName,
        email,
        password,
      });
      dispatch(getUser(user.data));
    } catch (error) {
      console.error(error, "asdfasdffs");
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    try {
      await axios.post(`${server}/auth/logout`);
      dispatch(removeUser());
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
