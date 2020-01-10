
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import validator from 'validator'
import { TextField } from 'redux-form-material-ui'
import { FlatButton, RaisedButton, Paper } from 'material-ui'
import { Link } from 'react-router-dom'
import { state } from 'aws-cognito-redux-saga'
import fb from "../images/fb.png";
import hexagon from "../images/hexagon.png";

const required = value => (value ? undefined : 'Required')
const email = value =>
  validator.isEmail(value) ? undefined : 'Not Valid Email'

  const style = {
    paper: {
      padding: '0'
    },
    layout: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%'
    },
    title: {
      fontSize: '32px',
      textAlign: 'center'
    },
    form: {
      width: '320px',
      display: 'flex',
      flexFlow: 'column',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    },
    signup: {
      fontSize: '14px',
      marginBottom: '16px',
      color:'#5c3296'
    },
    signinfb:{
      fontSize: '14px',
      marginTop: '0px',
      color:'#5c3296'   
    },
    imgflex:{
      display: 'flex',
      alignItems: 'center'
    },
    signInButton: {
      // marginBottom: '16px',
      width: '80%',
      // background: 'linear-gradient(to right, #5c3296 0%, #ac2ca3 100%)'
    },
    button: {
      margin: '8px 0'
    },
    error: {
      width: '80%',
      margin: '8px',
      color: 'rgb(200,0,0)',
      // height: '32px'
    },
    test: {
       height: '100px',
       background: 'linear-gradient(to right, #5c3296 0%, #ac2ca3 100%)',
       width: '100%'
    },  
    h1:{
      color: '#fff',
      fontSize: '20px',
      display: 'flex',
      alignItems: 'end',
      justifyContent: 'center',
      marginTop: '0px'
    },
    colortext:{
       background:'linear-gradient(to right, #5f309a 0%, #5b3197 100%)',
       height: '100%',
       margin: '0px',
       color: '#fff',
       borderRadius:'5px'
    },
    fbimg:{
        marginRight: '5px'
    },
    orflex:{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    orhr:{
      width: '100px',
      height: '2px',
      background: '#ccc',
      margin: '7px'
    },
    heximgdiv:{
      display:'flex',
      justifyContent: 'center',
      margin: '10px auto 0px auto'
    }
    
  }

class SignIn extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    signIn: PropTypes.func.isRequired,
    auth: PropTypes.object,
    init: PropTypes.func,
    history: PropTypes.object
  }

  constructor(props) {
    super(props)

    this.passwordReset = this.passwordReset.bind(this)
  }

  componentWillMount() {
    this.props.init()
  }

  signIn = values => {
    if (this.props.auth.isConfirmed === state.AUTH_SUCCESS) {
      this.props.signIn(values.email, values.password)
    } else {
      this.props.signIn(values.email, values.password, values.code)
    }
  }

  componentDidUpdate() {
    if (this.props.auth.isSignedIn === state.AUTH_SUCCESS) {
      this.props.history.push('/users')
    }
  }

  passwordReset() {
    this.props.history.push('/forcechangepassword')
  }

  renderPasswordReset() {
    const { handleSubmit } = this.props

    return (
      <div style={style.layout}>
        <Paper style={style.paper} zDepth={5}>
          <form style={style.form}>
            <div style={style.title}>Change Password</div>

            <RaisedButton
              style={style.signInButton}
              primary
              onClick={handleSubmit(this.passwordReset)}
            >
              Reset Password
            </RaisedButton>
          </form>
        </Paper>
      </div>
    )
  }

  renderSignIn() {
    const { handleSubmit, auth } = this.props
    return (
      <div style={style.layout}>
        <Paper style={style.paper} zDepth={5}>
          <form style={style.form}>
            {/* <div style={style.title}>Sign In</div> */}
            <div style={style.test}>
               <div style={style.heximgdiv}>
                   <img src={hexagon} alt="image" style={style.hexaimg} />
               </div>
               <h1 style={style.h1}>Your Brand Here</h1>
            </div>
            <Field
              style={style.button}
              name="email"
              validate={[required, email]}
              component={TextField}
              type="email"
              floatingLabelText="Email"
            />

            <Field
              style={style.button}
              name="password"
              validate={[required]}
              component={TextField}
              type="password"
              floatingLabelText="Password"
            />

            <div style={style.error}>{auth.error && auth.error.message}</div>

            {auth.isConfirmed === state.AUTH_FAIL ? (
              <Field
                style={style.button}
                name="code"
                validate={[required]}
                component={TextField}
                type="text"
                floatingLabelText="Confirmation Code"
              />
            ) : null}

            <RaisedButton
              style={style.signInButton}
              primary
              onClick={handleSubmit(this.signIn)}
            >
              <p style={style.colortext}>Sign In</p>
            </RaisedButton>
              
            <div style={style.orflex}>
                <div style={style.orhr}></div>
                <p>OR</p>
                <div style={style.orhr}></div>
            </div>

            <FlatButton
              style={style.signinfb}
              containerElement={<Link to="/signup" />}
            >
             <div style={style.imgflex}>
                  <img src={fb} alt="image" style={style.fbimg} />
                  Sign In with Facebook
              </div>
            </FlatButton>

            <div style={style.orflex}>
                <div style={style.orhr}></div>
                <p>OR</p>
                <div style={style.orhr}></div>
            </div>
              
            <FlatButton
              style={style.signup}
              containerElement={<Link to="/signup" />}
            >
              Create an Account
            </FlatButton> 

            {/* <FlatButton
              style={style.signup}
              containerElement={<Link to="/resetpassword" />}
            >
              Forgot Password
            </FlatButton> */}
          </form>
        </Paper>
      </div>
    )
  }

  render() {
    const { auth } = this.props
    if (auth.passwordResetRequired === state.AUTH_SUCCESS) {
      return this.renderPasswordReset()
    } else {
      return this.renderSignIn()
    }
  }
}

// Decorate the form component
export default reduxForm({
  form: 'signIn'
})(SignIn)
