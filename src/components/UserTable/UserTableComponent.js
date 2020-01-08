import React from "react";
import PropTypes from "prop-types";
import MUTable from "./MUTable";
import { state } from "aws-cognito-redux-saga";
import axios from "axios";
const style = {
  page: {},
  layout: {
    display: "flex",
    flexFlow: "column",
    alignItems: "center"
  },
  heading: {
    textAlign: "center",
    fontSize: "48px",
    margin: "64px"
  },
  label: {
    fontSize: "24px",
    margin: "8px 0",
    color: "rgb(0,64,128)"
  },
  token: {
    overflow: "auto",
    overflowWrap: "break-word",
    fontSize: "16px",
    width: "90vw"
  }
};

export class UserTableComponent extends React.Component {
  static propTypes = {
    isSignedIn: PropTypes.string,
    auth: PropTypes.object
  };

  renderAuthInfo(auth) {
    let url = `https://aw078d3c17.execute-api.us-east-1.amazonaws.com/dev/students/1ed85783-1c78-4bb1-b3f6-55a2f9a068fe/results`;
    let config = {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    };
    axios
      .get(url, config)
      .then(response => {
        console.log("get student result", response);
      })
      .catch(err => console.log("err", err));
    localStorage.setItem("token", auth.info.idToken.jwtToken);
    return (
      <div style={style.token}>
        {/* <div style={style.label}>Access Token</div>
        <div>{auth.info.accessToken.jwtToken}</div>
        <div style={style.label}>ID Token</div>
        <div>{auth.info.idToken.jwtToken}</div>
        <div style={style.label}>Refresh Token</div>
        <div>{auth.info.refreshToken.token}</div> */}
        <MUTable
          props={this.props}
          setSelectedStudent={this.props.setSelectedStudent}
        />
      </div>
    );
  }

  render() {
    const { auth } = this.props;

    return (
      <div style={style.page}>
        <div style={style.layout}>
          <div style={style.heading}>User Result</div>

          {auth.isSignedIn === state.AUTH_SUCCESS
            ? this.renderAuthInfo(auth)
            : null}
        </div>
      </div>
    );
  }
}
