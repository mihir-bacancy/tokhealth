import React from 'react'
import PropTypes from 'prop-types'

import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar'
import IconButton from 'material-ui/IconButton'
import FlatButton from 'material-ui/FlatButton'

import { Link } from 'react-router-dom'

import { state } from 'aws-cognito-redux-saga'
import signout from "../images/signout.png";
import hexagon from "../images/hexagon.png";

const style = {
   headerbg: {
    background:'linear-gradient( #283eb6, #1877c7)',
    color: '#fff'
  },
  textwhite: {
    color: '#fff'
  }  
  
}
export default class HeaderComponent extends React.Component {
  static propTypes = {
    isSignedIn: PropTypes.string,
    signUpError: PropTypes.bool,
    signOut: PropTypes.func,
    signIn: PropTypes.func,
    signUp: PropTypes.func,
    auth: PropTypes.object
  }

  signOut = () => {
    this.props.signOut()
  }

  render() {
    const { auth } = this.props

    return (
      <div>
         <Toolbar  style={style.headerbg} className="c_header">
          <ToolbarGroup className="logo_div">
            {/* <IconButton className="logo_icon"
              target="_blank"
            >
              <img src={hexagon} style={style.signout} />  
            </IconButton> */}
            <img src={hexagon}  className="logo_icon" />  
            <FlatButton className="logo_text"
              label="Tok Health Challenge" style={style.textwhite}
              containerElement={<Link to="/" />}
            />
          </ToolbarGroup>

          <ToolbarGroup className="userdet">
            {auth.isSignedIn !== state.AUTH_SUCCESS ? (
              <FlatButton className="test"
                containerElement={<Link to="/signin" />}
                label="Sign Up / Sign In" style={style.textwhite}
                onClick={this.signIn}
              />
            ) : (
              <div>                 
              {/* <FlatButton label="Sign Out" onClick={this.signOut} /> */}
                <div style={style.signoutbtn} className="signoutbtndiv">
                  <span>{auth.info.username}</span>
                  <img src={signout} onClick={this.signOut} className="signoutbtn" />  
                </div>              
                <div>
                
                </div>
            </div>

              )}
          </ToolbarGroup>
        </Toolbar>
      </div>
    )
  }
}
