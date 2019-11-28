import {
    GET_EMPLOYEES,
    CREATE_EMPLOYEE,
    UPDATE_EMPLOYEE,
    DELETE_EMPLOYEE,
    SHOW_EMPLOYEE,
} from "../actions/types";

const initialState = {
    data: [],
    errors: [],
    success: false,
    hasPage: true,
};

export default function companiesReducer(state = initialState, action) {
    switch (action.type) {
        case GET_EMPLOYEES:
            return { ...state, data: action.payload , success: false, errors: [] };
        case CREATE_EMPLOYEE:
            if(action.payload.status === 200) {
                return {...state , success: true};
            }
            if(action.payload.status === 422) {
                return {...state, errors: Object.values(action.payload.data.errors) , success: false};
            }
            break;
        case SHOW_EMPLOYEE:
            if(action.payload.status === 200) {
                let data = {};
                Object.keys(action.payload.data).map(key => {
                    if (action.payload.data[key] != null) {
                            return (data[key] = action.payload.data[key]);
                    } else {
                        return false;
                    }
                });
                return {...state , data  , hasPage: true};
            }
            if(action.payload.status === 404) {
                return {...state , hasPage: false};
            }
            break;
        case UPDATE_EMPLOYEE:
            if(action.payload.status === 200) {
                return {...state , success: true};
            }
            if(action.payload.status === 422) {
                return {...state, errors: Object.values(action.payload.data.errors) , success: false};
            }
            break;
        case DELETE_EMPLOYEE:
            if(action.payload.status === 422) {
                return {...state, errors: Object.values(action.payload.data.errors) , success: false};
            }else{
                const {data , ...other} = state.data;
                const new_data = data.filter(company => company.id !== action.payload.id);
                return {...state, data : {data : new_data , ...other}, success: true};
            }
        default:
            return state;
    }
}