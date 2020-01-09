import React from 'react'
import PropTypes from 'prop-types'
import MUTable from './MUTable'
import { state } from 'aws-cognito-redux-saga'

const style = {
  page: {},
  layout: {
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'center'
  },
  heading: {
    textAlign: 'center',
    fontSize: '28px',
    margin: '24px'
  },
  label: {
    fontSize: '24px',
    margin: '8px 0',
    color: 'rgb(0,64,128)'
  },
  token: {
    overflow: 'auto',
    overflowWrap: 'break-word',
    fontSize: '16px',
    width: '90vw'
  }
}

export class ProtectedComponent extends React.Component {
  static propTypes = {
    isSignedIn: PropTypes.string,
    auth: PropTypes.object
  }

  renderAuthInfo(auth) {
    localStorage.setItem("token", auth.info.idToken.jwtToken)
    return (
      <div style={style.token}>
        <MUTable setSelectedStudent={this.props.setSelectedStudent} />
      </div>
    )
  }

  render() {
    const { auth } = this.props
    return (
      <div style={style.page}>
        <div style={style.layout}>
          <div style={style.heading}>Students</div>

          {auth.isSignedIn === state.AUTH_SUCCESS
            ? this.renderAuthInfo(auth)
            : null}
        </div>
      </div>
    )
  }
}
