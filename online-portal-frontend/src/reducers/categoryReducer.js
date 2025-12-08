import * as constants from '../constants/categoryConstants';

const initialState = {
  loading: false,
  categories: [],
  error: null,
};

export default function categoryReducer(state = initialState, action) {
  switch (action.type) {
    case constants.CATEGORY_LIST_REQUEST:
    case constants.CATEGORY_ADD_REQUEST:
    case constants.CATEGORY_DELETE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case constants.CATEGORY_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: action.payload,
        error: null,
      };

    case constants.CATEGORY_ADD_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: [...state.categories, action.payload],
        error: null,
      };

    case constants.CATEGORY_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: state.categories.filter(cat => cat.id !== action.payload),
        error: null,
      };

    case constants.CATEGORY_LIST_FAIL:
    case constants.CATEGORY_ADD_FAIL:
    case constants.CATEGORY_DELETE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}
