import { connect } from 'react-redux'

import { reducer } from 'aws-cognito-redux-saga'
// import {
//   setSelectedStudent
// } from '../../actions'
import SelectedStudent from './SelectedStudentComponent'

const mapStatetoProps = state => {
  return {
    auth: state.auth,
    selectedStudent: state.student.selectedStudent
  }
}
// console.log("setSelectedStudent", setSelectedStudent)

const mapDispatchToProps = dispatch => {
  return {
    signedIn: () => {
      dispatch(reducer.signedIn())
    },
    signOut: () => {
      dispatch(reducer.signOut())
    },
    signIn: (username, password) => {
      dispatch(reducer.signIn(username, password))
    }
  }
}

export default connect(mapStatetoProps, mapDispatchToProps)(SelectedStudent)
