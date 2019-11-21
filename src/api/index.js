import axios from "axios";


export default class Api {

    _apiURL = 'http://127.0.0.1:8000/api/';
    _imageURL = 'http://127.0.0.1:8000/storage/';

    getCompanies(page = 1){
        return axios.get(`${this._apiURL}companies?page=${page}`)
    };
    getCompany(id){
        return axios.get(`${this._apiURL}companies/${id}`)
    };
    setCompany(data){
        return axios.post(`${this._apiURL}companies` , data , {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    };
    updateCompany(id , data){
        return axios.post(`${this._apiURL}companies/${id}` , data , {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    };
    destroyCompany(id){
        return axios.delete(`${this._apiURL}companies/${id}`)
    }


    getEmployees(page = 1){
        return axios.get(`${this._apiURL}employees?page=${page}`)
    };
    getCompaniesForEmployee(){
        return axios.get(`${this._apiURL}employees/create`)
    }
    getEmployee(id){
        return axios.get(`${this._apiURL}employees/${id}`)
    };
    setEmployee(data){
        return axios.post(`${this._apiURL}employees` , data)
    };
    updateEmployee(id , data){
        return axios.post(`${this._apiURL}employees/${id}` , data)
    };
    destroyEmployee(id){
        return axios.delete(`${this._apiURL}employees/${id}`)
    }

    getImage(image){
        return this._imageURL + image
    }
}
