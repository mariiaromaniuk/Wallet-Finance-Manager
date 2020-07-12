import axios from "axios";
import { server } from "../index";

// Action Types
const SEND_PUBLIC_TOKEN = "SEND_PUBLIC_TOKEN";

// Action Creators
const sendPublicToken = (token) => ({ type: SEND_PUBLIC_TOKEN, token });

export const sendToken = (token) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(`${server}/api/plaid/plaid_exchange`, {
        public_token: token,
      });
      dispatch(sendPublicToken(res.data));
    } catch (err) {
      console.log("Error sending public token: ", err.message);
    }
  };
};

const initialToken = [];

export default (state = initialToken, action) => {
  switch (action.type) {
    case SEND_PUBLIC_TOKEN:
      return action.token;
    default:
      return state;
  }
};
