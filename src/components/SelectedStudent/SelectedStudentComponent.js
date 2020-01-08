import React from "react";
import PropTypes from "prop-types";

import { Toolbar, ToolbarGroup } from "material-ui/Toolbar";
import IconButton from "material-ui/IconButton";
import FlatButton from "material-ui/FlatButton";

import { Link } from "react-router-dom";

import { state } from "aws-cognito-redux-saga";
import EventEmitter from "../../client";
console.log("EventEmitter", EventEmitter);
const myEmitter = new EventEmitter();

export default class SelectedStudentComponent extends React.Component {
  static propTypes = {
    isSignedIn: PropTypes.string,
    signUpError: PropTypes.bool,
    signOut: PropTypes.func,
    signIn: PropTypes.func,
    signUp: PropTypes.func,
    auth: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.c1 = this.c1.bind(this);
  }

  c1() {
    console.log("an event occurred!");
  }

  componentWillMount() {
    myEmitter.on("PASS_DATA", data => {
      this.setState({
        data: data
      });
    });

    myEmitter.on("eventOne", this.c1);
  }

  componentWillUnmount() {
    myEmitter.emit("eventOne");
  }

  signOut = () => {
    this.props.signOut();
  };

  render() {
    const { auth, student } = this.props;
    console.log("data", this.state);
    console.log("student", this.props.selectedStudent);
    return (
      <div>
        <Toolbar style={{ height: "20%" }}>
          <ToolbarGroup>
            {auth.isSignedIn !== state.AUTH_SUCCESS ? null : <div></div>}
          </ToolbarGroup>
        </Toolbar>
        <div
          style={{
            padding: "0px 24px",
            backgroundColor: "rgb(232, 232, 232)",
            display: "flex",
            justifyContent: "flex-end"
          }}
        >
          <table style={{ border: 1 }} className="border">
            <tr>
              <td>
                Students <br />
                20
              </td>
              <td>
                <table className="border">
                  <tr>
                    <td>Selected</td>
                    <td>123</td>
                  </tr>
                  <tr>
                    <td>Subject</td>
                    <td>123</td>
                  </tr>
                  <tr>
                    <td>Average</td>
                    <td>123</td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </div>
      </div>
    );
  }
}
