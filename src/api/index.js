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
    getImage(image){
        return this._imageURL + image
    }
}
