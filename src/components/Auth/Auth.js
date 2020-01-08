import React from 'react'
import PropTypes from 'prop-types'
import { config } from 'aws-cognito-redux-saga'

class Auth extends React.Component {
  static propTypes = {
    getUser: PropTypes.func
  }

  componentWillMount() {
    config.config.set({

    })

    this.props.getUser()
  }

  render() {
    return null
  }
}

export default Auth
