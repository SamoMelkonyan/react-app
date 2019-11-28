import {
    GET_COMPANIES,
    CREATE_COMPANY,
    UPDATE_COMPANY,
    DELETE_COMPANY,
    SHOW_COMPANY,
    GET_ALL_COMPANIES,
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

export const getAllCompanies =  () => {
    return dispatch => {
        api
            .getAllCompanies()
            .then(response => {
                dispatch(
                    {
                        type: GET_ALL_COMPANIES,
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

export const showCompany = (id) => {
    return dispatch => {
        api
            .getCompany(id)
            .then(response => {
                dispatch(
                    {
                        type: SHOW_COMPANY,
                        payload: response
                    }
                );
            })
            .catch(error => {
                if(error.response.status === 404) {
                    dispatch(
                        {
                            type: SHOW_COMPANY,
                            payload: error.response
                        }
                    );
                }
            });
    };
};



export const updateCompany = (id , data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("website", data.website);
    formData.append("_method", "PUT");
    if (data.logo) {
        formData.append("logo", data.logo);
    }


    return dispatch => {
        api.updateCompany(id , formData)
            .then(response => {
                dispatch(
                    {
                        type: UPDATE_COMPANY,
                        payload: response
                    }
                );
            })
            .catch(error => {
                if(error.response.status === 422) {
                    dispatch(
                        {
                            type: UPDATE_COMPANY,
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
                if(error.response && error.response.status === 422) {
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

