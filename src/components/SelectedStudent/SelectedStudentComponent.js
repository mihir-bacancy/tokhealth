import React from "react";
import PropTypes from "prop-types";

import { Toolbar, ToolbarGroup } from "material-ui/Toolbar";

import { state } from "aws-cognito-redux-saga";

export default class SelectedStudentComponent extends React.Component {
  static propTypes = {
    isSignedIn: PropTypes.string,
    signUpError: PropTypes.bool,
    signOut: PropTypes.func,
    signIn: PropTypes.func,
    signUp: PropTypes.func,
    auth: PropTypes.object
  };
  signOut = () => {
    this.props.signOut();
  };

  render() {
    const { auth } = this.props;

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
        >{
            auth.isSignedIn !== state.AUTH_SUCCESS ? null :
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
                        <td>Bacancy</td>
                      </tr>
                      <tr>
                        <td>Subject</td>
                        <td>CSS</td>
                      </tr>
                      <tr>
                        <td>Average</td>
                        <td>100</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>}
        </div>
      </div>
    );
  }
}
