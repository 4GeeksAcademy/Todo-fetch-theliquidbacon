//import react into the bundle
import React from "react";
import ReactDOM from "react-dom";

// include your styles into the webpack bundle
import "../styles/index.css";

import TodoList from "./component/home";

//render your react application
ReactDOM.render(<TodoList />, document.querySelector("#app"));