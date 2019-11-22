import React , {Component} from 'react';
import './index.scss';
import {Link} from 'react-router-dom';
import Api from "../../../api";
import ErrorMessage from "../../BaseComponents/errorMessage";
import SuccessMessage from "../../BaseComponents/successMessage";


export default class CompaniesEdit extends Component {
    api = new Api();
    refLogoFile = React.createRef();
    state = {
        name : '',
        email : '',
        website : '',
        logo : '',
        currentImage : '',
        errors : [],
        success : false,
    };

    componentDidMount() {
        const {id} = this.props.match.params;
        if(isNaN(id)){
            this.props.history.push('/error-404')
        }

        this.api.getCompany(id).then(response => {
            let data = {};
            Object.keys(response.data).map((key) => {
                if(response.data[key] != null) {
                    if(key !== 'logo') {
                        return data[key] = response.data[key]
                    }else{
                        return data['currentImage'] = response.data[key];
                    }
                }else{
                    return false
                }
            });
            this.setState({
                ...data
            })
        }).catch(err => {
            if(err.response.status === 404){
                this.props.history.push('/error-404')
            }
            console.error(err.response.data)
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const {id} = this.props.match.params;
        const formData = new FormData();
        formData.append('name' , this.state.name);
        formData.append('email', this.state.email);
        formData.append('website' , this.state.website);
        this.state.logo && formData.append('logo', this.state.logo);
        formData.append('_method' , 'PUT');

        this.api.updateCompany(id , formData)
            .then(response => {
                this.setState({
                    errors : [],
                    success : response.data.success,
                    currentImage : response.data.image
                });
                this.refLogoFile.current.value = '';
            })
            .catch(err => {
                return this.setState({
                    errors : Object.values(err.response.data.errors),
                    success : false,
                });
            });
    };
    handleChange = (e) => {
        let value = e.target.value;
        let name = e.target.name;
        if(name === 'logo'){
            value = e.target.files[0];
        }
        this.setState({
            [name]: value,
        });
    };

    render() {
        return(
            <div className="container mt-5 company-edit-container">
                <Link to="/companies" className="back-link"><i className="fa fa-chevron-circle-left" /></Link>
                <SuccessMessage success={this.state.success} message='The company has been successfully edited' />
                <ErrorMessage errors={this.state.errors}/>

                <h1 className="text-center mb-3">Edit Company</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name *</label>
                        <input type="text"
                               className="form-control"
                               name="name"
                               id="name"
                               placeholder="Company name"
                               value={this.state.name}
                               onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="text"
                               className="form-control"
                               name="email"
                               id="email"
                               placeholder="Email"
                               value={this.state.email}
                               onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="logo">Logo</label>
                        <div>
                        { this.state.currentImage && <img src={this.api.getImage(this.state.currentImage)} alt={this.state.name} />}
                        <input type="file"
                               name="logo"
                               id="logo"
                               onChange={this.handleChange}
                               ref = {this.refLogoFile}
                        />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="website">Website</label>
                        <input type="text"
                               className="form-control"
                               name="website"
                               id="website"
                               placeholder="Website"
                               value={this.state.website}
                               onChange={this.handleChange} />
                    </div>
                    <button type="submit" className="btn btn-success w-100">Edit</button>
                </form>
            </div>
        )
    }
}