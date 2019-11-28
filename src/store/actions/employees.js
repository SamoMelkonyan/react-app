import {
    GET_EMPLOYEES,
    CREATE_EMPLOYEE,
    UPDATE_EMPLOYEE,
    DELETE_EMPLOYEE,
    SHOW_EMPLOYEE,
} from "./types";
import Api from "api";

const api = new Api();

export const getEmployees = (page = 1) => {
    return dispatch => {
        api
            .getEmployees(page)
            .then(response => {
                dispatch(
                    {
                        type: GET_EMPLOYEES,
                        payload: response.data
                    }
                );
            })
            .catch(error => {
                throw error;
            });
    };
};


export const createEmployee = (data) => {
    const formData = new FormData();
    formData.append("first_name", data.first_name);
    formData.append("last_name", data.last_name);
    formData.append("companies_id", data.companies_id);
    formData.append("email", data.email);
    formData.append("phone", data.phone);


    return dispatch => {
        api.setEmployee(formData)
            .then(response => {
                dispatch(
                    {
                        type: CREATE_EMPLOYEE,
                        payload: response
                    }
                );
            })
            .catch(error => {
                if(error.response.status === 422) {
                    dispatch(
                        {
                            type: CREATE_EMPLOYEE,
                            payload: error.response
                        }
                    );
                }
            });
    };
};

export const showEmployee = (id) => {
    return dispatch => {
        api
            .getEmployee(id)
            .then(response => {
                dispatch(
                    {
                        type: SHOW_EMPLOYEE,
                        payload: response
                    }
                );
            })
            .catch(error => {
                if(error.response.status === 404) {
                    dispatch(
                        {
                            type: SHOW_EMPLOYEE,
                            payload: error.response
                        }
                    );
                }
            });
    };
};



export const updateEmployee = (id , data) => {
    const formData = new FormData();
    formData.append("first_name", data.first_name);
    formData.append("last_name", data.last_name);
    formData.append("companies_id", data.companies_id);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("_method", "PUT");



    return dispatch => {
        api.updateEmployee(id , formData)
            .then(response => {
                dispatch(
                    {
                        type: UPDATE_EMPLOYEE,
                        payload: response
                    }
                );
            })
            .catch(error => {
                if(error.response.status === 422) {
                    dispatch(
                        {
                            type: UPDATE_EMPLOYEE,
                            payload: error.response
                        }
                    );
                }
            });
    };
};



export const deleteEmployee = (id) => {

    return dispatch => {
        api.destroyEmployee(id)
            .then(response => {
                dispatch(
                    {
                        type: DELETE_EMPLOYEE,
                        payload: {response , id}
                    }
                );
            })
            .catch(error => {
                if(error.response && error.response.status === 422) {
                    dispatch(
                        {
                            type: DELETE_EMPLOYEE,
                            payload: error.response
                        }
                    );
                }
            });
    };
};

