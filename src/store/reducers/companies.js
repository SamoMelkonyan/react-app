import {
    GET_COMPANIES,
    GET_ALL_COMPANIES,
    CREATE_COMPANY,
    UPDATE_COMPANY,
    DELETE_COMPANY,
    SHOW_COMPANY,
} from "../actions/types";

const initialState = {
    data: [],
    errors: [],
    success: false,
    hasPage: true,
};

export default function companiesReducer(state = initialState, action) {
    switch (action.type) {
        case GET_COMPANIES:
            return { ...state, data: action.payload , success: false, errors: [] };
        case GET_ALL_COMPANIES:
            return { ...state, data: action.payload , success: false, errors: [] };
        case CREATE_COMPANY:
            if(action.payload.status === 200) {
                return {...state , success: true};
            }
            if(action.payload.status === 422) {
                return {...state, errors: Object.values(action.payload.data.errors) , success: false};
            }
            break;
        case SHOW_COMPANY:
            if(action.payload.status === 200) {
                let data = {};
                Object.keys(action.payload.data).map(key => {
                    if (action.payload.data[key] != null) {
                        if (key !== "logo") {
                                return (data[key] = action.payload.data[key]);
                            } else {
                                return (data["currentImage"] = action.payload.data[key]);
                            }
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
        case UPDATE_COMPANY:
            if(action.payload.status === 200) {
                return {...state , data : {currentImage: action.payload.data.image} , success: true};
            }
            if(action.payload.status === 422) {
                return {...state, errors: Object.values(action.payload.data.errors) , success: false};
            }
            break;
        case DELETE_COMPANY:
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