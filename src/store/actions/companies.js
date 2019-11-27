import {
    GET_COMPANIES,
    CREATE_COMPANY,
    UPDATE_COMPANY,
    DELETE_COMPANY,
    SHOW_COMPANY,
} from "./types";
import Api from "api";

const api = new Api();

export const getCompanies = (page = 1) => {
    return dispatch => {
            api
                .getCompanies(page)
                .then(response => {
                    dispatch(
                        {
                            type: GET_COMPANIES,
                            payload: response.data
                        }
                    );
                })
                .catch(error => {
                    throw error;
                });
    };
};


export const createCompany = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("website", data.website);
    if (data.logo) {
        formData.append("logo", data.logo);
    }


    return dispatch => {
         api.setCompany(formData)
            .then(response => {
                    dispatch(
                        {
                            type: CREATE_COMPANY,
                            payload: response
                        }
                    );
            })
            .catch(error => {
                if(error.response.status === 422) {
                    dispatch(
                        {
                            type: CREATE_COMPANY,
                            payload: error.response
                        }
                    );
                }
            });
    };
};



export const deleteCompany = (id) => {

    return dispatch => {
        api.destroyCompany(id)
            .then(response => {
                dispatch(
                    {
                        type: DELETE_COMPANY,
                        payload: {response , id}
                    }
                );
            })
            .catch(error => {
                if(error.response.status === 422) {
                    dispatch(
                        {
                            type: DELETE_COMPANY,
                            payload: error.response
                        }
                    );
                }
            });
    };
};

