import {
    GET_EMPLOYEES,
    CREATE_EMPLOYEE,
    UPDATE_EMPLOYEE,
    DELETE_EMPLOYEE,
    SHOW_EMPLOYEE,
    GET_ALL_EMPLOYEES
} from "../actions/types";

const initialState = {
    data: [],
    allData: [],
    errors: [],
    success: false,
    hasPage: true,
};

export default function companiesReducer(state = initialState, action) {
    switch (action.type) {
        case GET_EMPLOYEES:
            return { ...state, data: action.payload, errors: [] };
        case GET_ALL_EMPLOYEES:
            return { ...state, allData: action.payload, errors: [] };
        case CREATE_EMPLOYEE:
            if(action.payload.status === 200) {
                const {allData} = state;
                allData.push(action.payload.data);
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
                const {allData} = state;
                const new_data = data.filter(employee => employee.id !== action.payload.id);
                const new_allData = allData.filter(employee => employee.id !== action.payload.id);
                return {...state, data : {data : new_data , ...other}, allData: new_allData, success: true};
            }
        default:
            return state;
    }
}