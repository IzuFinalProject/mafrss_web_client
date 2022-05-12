import React, { Component } from "react";
import { BrowserRouter as Router, Link, useRoutes } from "react-router-dom";
import "./App.css";

import AuthService from "./services/auth";

import Home from "./components/home";
import Login from "./components/login";
import BoardAdmin from "./components/admin/adminBoard";
import BoardUser from "./components/userBoard";
import Profile from "./components/account/profile";
import Activate from "./components/activate";
import ResetPassword from "./components/resetPassword";
import RestPasswordConfirm from "./components/resetPasswordConfirm";

import EventBus from "./common/EventBus";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();
    console.log("if user");
    console.log(user);
    if (user) {
      this.setState({
        currentUser: user,
        showAdminBoard: user.is_superuser,
      });
    }

    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    // EventBus.remove("logout");
  }

  logOut() {
    // AuthService.logout();
    // this.setState({
    //   showModeratorBoard: false,
    //   showAdminBoard: false,
    //   currentUser: undefined,
    // });
  }

  render() {
    const { currentUser, showAdminBoard } = this.state;
    const AppRoutes = () =>
      useRoutes([
        { path: "/", element: <Home /> },
        { path: "/login", element: <Login /> },
        { path: "/profile", element: <Profile /> },
        { path: "/user", element: <BoardUser /> },
        { path: "/admin", element: <BoardAdmin /> },
        { path: "/reset-password", element: <ResetPassword /> },
        {
          path: "/password/reset/confirm/:uid/:token",
          element: <RestPasswordConfirm />,
        },
        { path: "/activate/:uid/:token", element: <Activate /> },
      ]);
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/"} className="nav-link">
                Home
              </Link>
            </li>

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </li>
            )}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>
            </div>
          )}
        </nav>
        <div className="container-fluid mt-1">
          <AppRoutes />
        </div>
      </div>
    );
  }
}

export default App;
