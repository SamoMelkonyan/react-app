import axios from "axios";

export default class Api {
    _apiURL = "http://127.0.0.1:8000/api/";
    _imageURL = "http://127.0.0.1:8000/storage/";
    _token = localStorage["token"] && JSON.parse(localStorage["token"]).access_token;

    constructor() {
        this.Auth = axios.create();
        this.Auth.interceptors.response.use(
            response => response,
            error => {
                try{
                    if (error.response.status === 401) {
                        localStorage.removeItem("token");
                        window.location.href = "/login";
                    }
                }catch (e) {
                    localStorage.removeItem("token");
                    window.location.href = "/login";
                }
            }
        );
    }

    // companies
    getCompanies(page = 1) {
        return this.Auth.get(`${this._apiURL}companies?page=${page}` , {
            headers: {
                'Authorization': `bearer  ${this._token}`
            }
        });
    }
    getCompany(id) {
        return this.Auth.get(`${this._apiURL}companies/${id}` , {
            headers: {
                'Authorization': `bearer  ${this._token}`
            }
        });
    }
    setCompany(data) {
        return this.Auth.post(`${this._apiURL}companies?token=${this._token}`, data, {
            headers: {
                'Authorization': `bearer  ${this._token}`,
                "Content-Type": "multipart/form-data"
            }
        });
    }
    updateCompany(id, data) {
        return this.Auth.post(`${this._apiURL}companies/${id}`, data, {
            headers: {
                'Authorization': `bearer  ${this._token}`,
                "Content-Type": "multipart/form-data"
            }
        });
    }
    destroyCompany(id) {
        return this.Auth.delete(`${this._apiURL}companies/${id}` , {
            headers: {
                'Authorization': `bearer  ${this._token}`
            }
        });
    }

    // employees
    getEmployees(page = 1) {
        return this.Auth.get(`${this._apiURL}employees?page=${page}` , {
            headers: {
                'Authorization': `bearer  ${this._token}`
            }
        });
    }
    getCompaniesForEmployee() {
        return this.Auth.get(`${this._apiURL}employees/create` , {
            headers: {
                'Authorization': `bearer  ${this._token}`
            }
        });
    }
    getEmployee(id) {
        return this.Auth.get(`${this._apiURL}employees/${id}` , {
            headers: {
                'Authorization': `bearer  ${this._token}`
            },
        });
    }
    setEmployee(data) {
        return this.Auth.post(`${this._apiURL}employees`, data , {
            headers: {
                'Authorization': `bearer  ${this._token}`
            }
        });
    }
    updateEmployee(id, data) {
        return this.Auth.post(`${this._apiURL}employees/${id}`, data , {
            headers: {
                'Authorization': `bearer  ${this._token}`
            }
        });
    }
    destroyEmployee(id) {
        return this.Auth.delete(`${this._apiURL}employees/${id}` , {
            headers: {
                'Authorization': `bearer  ${this._token}`
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
