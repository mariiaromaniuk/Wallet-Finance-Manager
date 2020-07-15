import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import user from "./store/user";
import token from "./store/token";
import dashboard from "./store/Dashboard";
const reducer = combineReducers({
  user,
  token,
  dashboard,
});

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export const server = "http://localhost:8080";

export default store;

export * from "./store/user";
