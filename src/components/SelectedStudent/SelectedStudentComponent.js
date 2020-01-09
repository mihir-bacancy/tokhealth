import React from "react";
import PropTypes from "prop-types";

import { Toolbar, ToolbarGroup } from "material-ui/Toolbar";

import { state } from "aws-cognito-redux-saga";

const style = {
  // signoutbtn: {
  //   display: 'flex',
  //   justifyContent: 'flex-end',
  //   alignItems: 'center'
  // },
  // signout: {
  //   maxWidth: '30px',
  //   margin: '10px'
  // },
  // test: {
  //   background:'linear-gradient( #283eb6, #1877c7)',
  //   color: '#fff'
  // },
  // textwhite: {
  //   color: '#fff'
  // }  
  
}

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
            background:' #1877c7',
            display: "flex",
            justifyContent: "flex-end",
            color: '#fff'
          }}
        >{
            auth.isSignedIn !== state.AUTH_SUCCESS ? null :
              <table style={{ border: 1, width: 100 }} className="border">
                <tr>
                  <td style={{ display: "flex" ,  }}>
                      <p style={{ marginRight: "10px" }}> Students </p>
                      <p> 20 </p>
                  </td>
                  <td>:</td>
                  <td>
                    <table className="border" style={{ display: "flex" }}>
                      <tr>
                        <td>Selected</td>
                        <td>Bacancy</td>
                      </tr>
                      <tr>|</tr>
                      <tr>
                        <td>Subject</td>
                        <td>CSS</td>
                      </tr>
                      <tr>|</tr>
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
