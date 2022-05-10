import React, { Component } from "react";

import UserService from "../services/user";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentDidMount() {
   
  }

  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>Home</h3>
        </header>
      </div>
    );
  }
}