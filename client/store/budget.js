import axios from "axios";
import { server } from "../server";

// Action Types
const GET_BUDGET = "GET_BUDGET";
const UPDATE_BUDGET = "UPDATE_BUDGET";

// Action Creators
const getBudget = (budget) => ({ type: GET_BUDGET, budget });
const updateBudget = (budget) => ({ type: UPDATE_BUDGET, budget });

export const fetchBudget = (userId) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`${server}/api/budget/${userId}`);
      console.log("DATA", res.data);
      dispatch(getBudget(res.data));
    } catch (err) {
      console.log("Error fetching budget: ", err.message);
    }
  };
};

export const setBudget = (budget, userId) => {
  return async (dispatch) => {
    try {
      const res = await axios.put(`${server}/api/budget/${userId}`, budget);
      dispatch(updateBudget(res.data));
    } catch (err) {
      console.log("Error setting budget: ", err.message);
    }
  };
};

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_BUDGET:
      return action.budget;
    case UPDATE_BUDGET:
      return action.budget;
    default:
      return state;
  }
};
