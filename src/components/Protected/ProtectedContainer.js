import { connect } from 'react-redux'
import { ProtectedComponent } from './Protected'
import {
  setSelectedStudent
} from '../../actions'
const mapStatetoProps = state => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = dispatch => {
	console.log(setSelectedStudent)
  return {
    setSelectedStudent: (user) => {
      dispatch(setSelectedStudent(user))
    }
  }
}

export default connect(mapStatetoProps, mapDispatchToProps)(ProtectedComponent)
