import * as constants from '../constants/quizConstants';

const initialState = {
  loading: false,
  quizzes: [],
  quizDetails: null,
  error: null,
};

export default function quizReducer(state = initialState, action) {
  switch (action.type) {
    case constants.QUIZ_LIST_REQUEST:
    case constants.QUIZ_DETAILS_REQUEST:
    case constants.QUIZ_ADD_REQUEST:
    case constants.QUIZ_DELETE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case constants.QUIZ_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        quizzes: action.payload,
        error: null,
      };

    case constants.QUIZ_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        quizDetails: action.payload,
        error: null,
      };

    case constants.QUIZ_ADD_SUCCESS:
      return {
        ...state,
        loading: false,
        quizzes: [...state.quizzes, action.payload],
        error: null,
      };

    case constants.QUIZ_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        quizzes: state.quizzes.filter(quiz => quiz.id !== action.payload),
        error: null,
      };

    case constants.QUIZ_LIST_FAIL:
    case constants.QUIZ_DETAILS_FAIL:
    case constants.QUIZ_ADD_FAIL:
    case constants.QUIZ_DELETE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}
