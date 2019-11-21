import React , {Component} from 'react';
import './index.css';
import {Link} from 'react-router-dom';
import Api from "../../../api";
import ErrorMessage from "../../Messages/error";
import SuccessMessage from "../../Messages/success";


export default class CompaniesEdit extends Component {
    api = new Api();

    state = {
        name : '',
        email : '',
        website : '',
        logo : '',
        errors : [],
        success : false,
    };


    handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name' , this.state.name);
        formData.append('email' , this.state.email);
        formData.append('website' , this.state.website);
        if(this.state.logo) {
            formData.append('logo', this.state.logo);
        }

        this.api.setCompany(formData)
            .then(response => {
                this.setState({
                    name : '',
                    email : '',
                    website : '',
                    logo : '',
                    errors : [],
                    success : response.data.success
                })

            })
            .catch(err => {
                return this.setState({
                    errors : Object.values(err.response.data.errors),
                });
            });
    };
    handleChange = (e) => {
        let value = e.target.value;
        const name = e.target.name;
        if(name === 'logo'){
            value = e.target.files[0];
        }
        this.setState({
            [name]: value,
        });
    };

    render() {
        return(
            <div className="container mt-5">
                <Link to="/companies" className="back-link"><i className="fa fa-chevron-circle-left" /></Link>
                <SuccessMessage success={this.state.success} message='The company has been successfully added' />
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
                        <input type="file"
                               className="custom-file"
                               name="logo"
                               id="logo"
                               onChange={this.handleChange} />
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