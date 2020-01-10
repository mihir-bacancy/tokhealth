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
        <div className="stdrsltdet" >{
            auth.isSignedIn !== state.AUTH_SUCCESS ? null :
              <table style={{ border: 1}} className="border">
                <tr className="stdtable">
                  <td style={{ display: "flex" ,   }}>
                      <tr>
                          <td> Students : </td>
                          <td> <strong> 20 </strong></td>
                      </tr>
                  </td>                  
                  <td>
                    <table className="border" className="stdtablemore">
                      <tr>
                        <td>Selected :</td>
                        <td><strong> Bacancy </strong></td>
                      </tr>
                      
                      <tr>
                        <td>Subject :</td>
                        <td><strong> CSS </strong></td>
                      </tr>
                      
                      <tr>
                        <td>Average :</td>
                        <td><strong>100</strong></td>
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
