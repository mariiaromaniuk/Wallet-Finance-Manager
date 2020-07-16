import axios from "axios";
import { server } from "../server";

//action types
const GET_TRANSACTIONS = "GET_TRANSACTIONS";

//action creators
export const getTransactions = (requestedTransactions) => ({
  type: GET_TRANSACTIONS,
  requestedTransactions,
});

//state
const initialDefaultTransactions = [];

//thunks
export const fetchTransactions = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${server}/api/transactions/${id}`);
      if (data) {
        dispatch(getTransactions(data || initialState));
      }
    } catch (error) {
      console.log("error", error);
    }
  };
};

//reducers

export default function (state = initialDefaultTransactions, action) {
  switch (action.type) {
    case GET_TRANSACTIONS:
      return action.requestedTransactions;
    default:
      return state;
  }
}
