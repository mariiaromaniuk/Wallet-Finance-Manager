import axios from "axios";
import { server } from "../server";

//action types
const GET_ACCOUNTS = "GET_ACCOUNTS";

//action creators
const getAccounts = (requestedAccounts) => ({
  type: GET_ACCOUNTS,
  requestedAccounts,
});

//state
const initialState = [];

//thunk
export const fetchAccounts = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${server}/api/accounts/user/${id}`);
      if (data) {
        dispatch(getAccounts(data || initialState));
      }
    } catch (error) {
      console.log("error", error);
    }
  };
};

//reducer

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ACCOUNTS:
      return action.requestedAccounts;
    default:
      return state;
  }
}
