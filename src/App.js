import React from "react";
import PropTypes from "prop-types";

import "./App.css";
import Landing from "./components/Landing";
import Protected from "./components/Protected";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import ResetPassword from "./components/ResetPassword";
import ChangePassword from "./components/ChangePassword";
import ForceChangePassword from "./components/ForceChangePassword";
import Header from "./components/Header";
import SelectedStudent from "./components/SelectedStudent";
import Auth from "./components/Auth";
import PrivateRoute from "./components/PrivateRoute";
import UserTable from "./components/UserTable";

import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import { state } from "aws-cognito-redux-saga";

class App extends React.Component {
  static propTypes = {
    auth: PropTypes.object
  };

  render() {
    const { auth } = this.props;
    return (
      <Router>
        <div className="app">
          <div className="screen">
            <Auth />
            <Header />
            <SelectedStudent />
            <Switch>
              <PrivateRoute path="/users" exact component={Protected} />
              <Route path="/signin" component={SignIn} />
              <Route path="/signup" component={SignUp} />
              <Route path="/resetpassword" component={ResetPassword} />
              <Route path="/changepassword" component={ChangePassword} />
              <Route
                path="/forcechangepassword"
                component={ForceChangePassword}
              />
              <Route path="/landing" component={Landing} />
              <Route path="/user/:userId" exact component={UserTable} />

              <Route
                path="/"
                render={() =>
                  auth.isSignedIn === state.AUTH_SUCCESS ? (
                    <Redirect to="/users" />
                  ) : (
                      <Redirect to="/" />
                    )
                }
              />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
