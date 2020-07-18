import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import user from "./store/user";
import token from "./store/token";
import transactions from "./store/spending";
import accounts from "./store/accounts";
import budget from "./store/budget";

const reducer = combineReducers({
  user,
  token,
  budget,
  transactions,
  accounts,
});

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;

export * from "./store/user";
export * from "./store/spending";
export * from "./store/accounts";
export * from './store/budget';
