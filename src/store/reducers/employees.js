import {
    GET_EMPLOYEES,
    CREATE_EMPLOYEE,
    UPDATE_EMPLOYEE,
    DELETE_EMPLOYEE,
    SHOW_EMPLOYEE,
} from "../actions/types";

const initialState = {
    data: [],
    error: null,
    isLoading: true
};

export default function companiesReducer(state = initialState, action) {
    switch (action.type) {
        case GET_EMPLOYEES:
            return { ...state, data: action.payload };
        /*  case DELETE_POST:
          return state.filter(post => post._id !== action.payload.id);
        case FETCH_POST:
          return action.posts;*/
        default:
            return state;
    }
}