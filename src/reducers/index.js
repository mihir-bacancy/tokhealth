
import { combineReducers } from 'redux'
import { reducer as authReducer } from 'aws-cognito-redux-saga'
import { reducer as formReducer } from 'redux-form'

const initialState = {
  selectedStudent: {
    "score_average": 90.3,
    "subject_count": 3,
    "id": "1ed85783-1c78-4bb1-b3f6-55a2f9a068fe",
    "name": "mihiasdasdasd2",
    "updatedAt": 1578038514804
  },
};

let student = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SELECTED_STUDENT":
      return { ...state, selectedStudent: action.payload };
    default:
      return { ...state };
  }
};

const reducers = combineReducers({
  auth: authReducer.reducer,
  form: formReducer,
  student: student
})

export default reducers

