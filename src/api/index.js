import axios from "axios";

export default class Api {
    _apiURL = "http://127.0.0.1:8000/api/";
    _imageURL = "http://127.0.0.1:8000/storage/";

    getToken(){
        return localStorage["token"] && JSON.parse(localStorage["token"]).access_token
    }

    constructor() {
        this.Auth = axios.create();
        this.Auth.interceptors.response.use(
            response => response,
            error => {
                if (error.response.status === 401) {
                    localStorage.removeItem("token");
                    window.location.href = "/login";
                }
                throw error;
            }
        );
    }

    // companies
    getCompanies(page = 1) {
        return this.Auth.get(`${this._apiURL}companies?page=${page}` , {
            headers: {
                'Authorization': `bearer  ${this.getToken()}`
            }
        });
    }
    getAllCompanies() {
        return this.Auth.get(`${this._apiURL}companies/all` , {
            headers: {
                'Authorization': `bearer  ${this.getToken()}`
            }
        });
    }
    getCompany(id) {
        return this.Auth.get(`${this._apiURL}companies/${id}` , {
            headers: {
                'Authorization': `bearer  ${this.getToken()}`
            }
        });
    }
    setCompany(data) {
        return this.Auth.post(`${this._apiURL}companies`, data, {
            headers: {
                'Authorization': `bearer  ${this.getToken()}`,
                "Content-Type": "multipart/form-data",
            }
        });
    }
    updateCompany(id, data) {
        return this.Auth.post(`${this._apiURL}companies/${id}`, data, {
            headers: {
                'Authorization': `bearer  ${this.getToken()}`,
                "Content-Type": "multipart/form-data"
            }
        });
    }
    destroyCompany(id) {
        return this.Auth.delete(`${this._apiURL}companies/${id}` , {
            headers: {
                'Authorization': `bearer  ${this.getToken()}`
            }
        });
    }

    // employees
    getEmployees(page = 1) {
        return this.Auth.get(`${this._apiURL}employees?page=${page}` , {
            headers: {
                'Authorization': `bearer  ${this.getToken()}`
            }
        });
    }
    getAllEmployees() {
        return this.Auth.get(`${this._apiURL}employees/all` , {
            headers: {
                'Authorization': `bearer  ${this.getToken()}`
            }
        });
    }
    getEmployee(id) {
        return this.Auth.get(`${this._apiURL}employees/${id}` , {
            headers: {
                'Authorization': `bearer  ${this.getToken()}`
            },
        });
    }
    setEmployee(data) {
        return this.Auth.post(`${this._apiURL}employees`, data , {
            headers: {
                'Authorization': `bearer  ${this.getToken()}`
            }
        });
    }
    updateEmployee(id, data) {
        return this.Auth.post(`${this._apiURL}employees/${id}`, data , {
            headers: {
                'Authorization': `bearer  ${this.getToken()}`
            }
        });
    }
    destroyEmployee(id) {
        return this.Auth.delete(`${this._apiURL}employees/${id}` , {
            headers: {
                'Authorization': `bearer  ${this.getToken()}`
            }
        });
    }

    getImage(image) {
        return this._imageURL + image;
    }

    signIn(data) {
        return axios.post(`${this._apiURL}user/login`, data);
    }
}
