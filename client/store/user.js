import axios from "axios";
import { server } from "../index";
import { get } from "../../server/api";

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

 export const login = (email, password,navigation) => {
   return async (dispatch) =>{
     try {
       await axios.post(`${server}/auth/login`,{email, password})
       dispatch(getUser(res.data))
       navigation.navigate('Home')
     } catch (error) {
      console.log(error)
     }
   }
 }

export const signup = (userInput) => {
  return async (dispatch) => {
    try {
      //   Line below fails
      let user = await axios.post(`${server}/auth/signup`, { userInput });
      dispatch(getUser(user.data));
    } catch (error) {
      console.error('Error: ',error)
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
