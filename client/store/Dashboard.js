import axios from "axios";
import { server } from "../index";

// Action Types
const GET_INFO = "GET_INFO";
const UPDATE_INFO = "UPDATE_INFO";

// Action Creators
const getInfo = (info) => ({ type: GET_INFO, info });
const updateInfo = (info) => ({ type: UPDATE_INFO, info });

export const fetchInfo = () => {
  return async (dispatch) => {
    try {
      console.log("We are in the dashboard store");
      const res = await axios.get(`${server}/api/accounts/`);
      console.log(res.data);
      dispatch(getInfo(res.data));
    } catch (err) {
      console.log("Error fetching info: ", err.message);
    }
  };
};

export const setInfo = (info) => {
  return async (dispatch) => {
    try {
      const res = await axios.put(`${server}/api/accounts`, info);
      dispatch(updateInfo(res.data));
    } catch (err) {
      console.log("Error setting info: ", err.message);
    }
  };
};

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_INFO:
      return action.info;
    case UPDATE_INFO:
      return action.info;
    default:
      return state;
  }
};
