import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { thunk } from "redux-thunk";

let initialStore = {
  userDetails: {},
};
let reducer = (updatedStore = initialStore, dispatchedObj) => {
  if (dispatchedObj.type === "login") {
    return { ...updatedStore, userDetails: dispatchedObj.data };
  }
  return updatedStore;
};
let tasksReducer = (updatedStore = initialStore, dispatchedObj) => {
  if (dispatchedObj.type === "addTask") {
    return { ...updatedStore, userDetails: dispatchedObj.data };
  } else if (dispatchedObj.type === "submitTask") {
    return { ...updatedStore, userDetails: dispatchedObj.data };
  } else if (dispatchedObj.type === "deleteTask") {
    return { ...updatedStore, userDetails: dispatchedObj.data };
  }
  return updatedStore;
};
let store = createStore(combineReducers({reducer,tasksReducer}), applyMiddleware(thunk));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
