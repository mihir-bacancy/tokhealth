import React from "react";
import PropTypes from "prop-types";
import { config } from "aws-cognito-redux-saga";

class Auth extends React.Component {
  static propTypes = {
    getUser: PropTypes.func
  };

  componentWillMount() {
    config.config.set({
      region: "----Add your creds----",
      IdentityPoolId: "-------Add your creds-----",
      UserPoolId: "-------Add your creds-----",
      ClientId: "-------Add your creds-----"
    });
    this.props.getUser();
  }

  render() {
    return null;
  }
}

export default Auth;
