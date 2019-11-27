import {
    GET_COMPANIES,
    CREATE_COMPANY,
    UPDATE_COMPANY,
    DELETE_COMPANY,
    SHOW_COMPANY,
} from "../actions/types";

const initialState = {
    data: [],
    errors: [],
    success: false,
};

export default function companiesReducer(state = initialState, action) {
    switch (action.type) {
        case GET_COMPANIES:
            return { ...state, data: action.payload , success: false, errors: [] };
            break;
        case CREATE_COMPANY:
            if(action.payload.status === 200) {
                return {...state , success: true};
            }
            if(action.payload.status === 422) {
                return {...state, errors: Object.values(action.payload.data.errors) , success: false};
            }
            break;
        case DELETE_COMPANY:
            if(action.payload.status === 422) {
                return {...state, errors: Object.values(action.payload.data.errors) , success: false};
            }else{
                let data = [...state.data.data];
                data = data.filter(company => company.id !== action.payload.id);
                return {...state, data : {data , ...data}, success: true};
            }
            break;
        default:
            return state;
    }
}