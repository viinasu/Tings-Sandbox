import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import Home from "./components/home.jsx";

export class App extends Component {
  constructor(props){
    super(props);
  }

  render() {
      return (
          <Router>
            <div>
                <Route exact path="/" component={ Home }/>
            </div>
          </Router>
      );
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById("app-root")
);
