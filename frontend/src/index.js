import React from "react";
import ReactDOM from "react-dom";
import { createStore } from 'redux'
import testTask from './reducers/index'

import App from "./components/App";

const wrapper = document.getElementById("app");
const store = createStore(
    testTask,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

if (wrapper) {
    ReactDOM.render(<App store={store}/>, wrapper)
}
