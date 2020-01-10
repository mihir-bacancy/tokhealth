import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import validator from 'validator'

import { Link } from 'react-router-dom'

import { TextField } from 'redux-form-material-ui'

import { RaisedButton, Paper } from 'material-ui'

import { state } from 'aws-cognito-redux-saga'
import hexagon from "../images/hexagon.png";

const required = value => (value ? undefined : 'Required')
const email = value =>
  validator.isEmail(value) ? undefined : 'Not Valid Email'
const passwordMatch = (value, values) =>
  values.password !== values.passwordMatch && 'Passwords must match'
const minLength = value => (value.length >= 8 ? undefined : 'Min Length 8')

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
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  signUpButton: {
    margin: '32px',
    width: '80%'
  },
  field: {
    margin: '8px 32px'
  },
  error: {
    margin: '8px',
    color: 'rgb(200,0,0)'
  },
  validateTitle: {
    margin: '8px 32px',
    fontSize: '24px',
    textAlign: 'center'
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
 heximgdiv:{
  display:'flex',
  justifyContent: 'center',
  margin: '10px auto 0px auto'
},
}

class SignUp extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    signUp: PropTypes.func.isRequired,
    auth: PropTypes.object,
    init: PropTypes.func
  }

  componentWillMount() {
    this.props.init()
  }

  signUp = values => {
    this.props.signUp(values.email.toLowerCase(), values.password)
  }

  signUpForm = () => {
    const { handleSubmit, auth } = this.props
    return (
      <div style={style.layout}>
        <Paper style={style.paper} zDepth={5}>
          <form style={style.form}>
            {/* <div style={style.title}>Sign Up</div> */}
            <div style={style.test}>
               <div style={style.heximgdiv}>
                   <img src={hexagon} alt="image" style={style.hexaimg} />
               </div>
               <h1 style={style.h1}>Your Brand Here</h1>
            </div>
            <Field
              style={style.field}
              name="email"
              validate={[required, email]}
              component={TextField}
              type="email"
              floatingLabelText="Email"
            />

            <Field
              style={style.field}
              name="password"
              validate={[required, minLength]}
              component={TextField}
              type="password"
              floatingLabelText="Password"
            />

            <Field
              style={style.field}
              name="passwordMatch"
              validate={[required, passwordMatch, minLength]}
              component={TextField}
              type="password"
              floatingLabelText="Password"
            />

            <div style={style.error}>{auth.error.message}</div>

            <RaisedButton
              style={style.signUpButton}
              onClick={handleSubmit(this.signUp)}
              primary
            >
              <p style={style.colortext}>Sign Up</p>
            </RaisedButton>
          </form>
        </Paper>
      </div>
    )
  }

  signedUp = () => {
    return (
      <div style={style.layout}>
        <Paper style={style.paper} zDepth={5}>
          <div style={style.form}>
            <div style={style.validateTitle}>
              A verification code has been emailed
            </div>

            <RaisedButton
              style={style.signUpButton}
              containerElement={<Link to="/signin" />}
              primary
            >
              Sign In
            </RaisedButton>
          </div>
        </Paper>
      </div>
    )
  }

  render() {
    const { auth } = this.props

    return (
      <div style={style.layout}>
        {auth.hasSignedUp === state.AUTH_UNKNOWN
          ? this.signUpForm()
          : this.signedUp()}
      </div>
    )
  }
}

// Decorate the form component
export default reduxForm({
  form: 'signUp'
})(SignUp)
