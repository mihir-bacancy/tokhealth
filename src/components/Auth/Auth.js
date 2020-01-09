import React from "react";
import PropTypes from "prop-types";
import { config } from "aws-cognito-redux-saga";

class Auth extends React.Component {
  static propTypes = {
    getUser: PropTypes.func
  };

  componentWillMount() {
    config.config.set({      
      region: 'ap-south-1',
      IdentityPoolId: 'ap-south-1:a7c18cc5-6b0f-4669-88e3-ffce17fb4c35',
      UserPoolId: 'ap-south-1_Zwb0m5ECh',
      ClientId: '3jh4n98j76h9lrp61o4c956chj'

    });
    this.props.getUser();
  }

  render() {
    return null;
  }
}

export default Auth;
