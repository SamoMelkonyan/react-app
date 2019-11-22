import React, { Component } from "react";
import "./index.scss";
import { Link } from "react-router-dom";
import Api from "../../../api";
import ErrorMessage from "../../BaseComponents/errorMessage";
import SuccessMessage from "../../BaseComponents/successMessage";

export default class EmployeesCreate extends Component {
    api = new Api();

    state = {
        first_name: "",
        last_name: "",
        companies_id: "",
        email: "",
        phone: "",
        companiesList: [],
        errors: [],
        success: false
    };

    componentDidMount() {
        this.api.getCompaniesForEmployee().then(res => {
            this.setState({
                companiesList: res.data
            });
        });
    }

    handleSubmit = e => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("first_name", this.state.first_name);
        formData.append("last_name", this.state.last_name);
        formData.append("companies_id", this.state.companies_id);
        formData.append("email", this.state.email);
        formData.append("phone", this.state.phone);

        this.api
            .setEmployee(formData)
            .then(response => {
                this.setState({
                    first_name: "",
                    last_name: "",
                    companies_id: "",
                    email: "",
                    phone: "",
                    errors: [],
                    success: response.data.success
                });
            })
            .catch(err => {
                return this.setState({
                    errors: Object.values(err.response.data.errors),
                    success: false
                });
            });
    };
    handleChange = e => {
        const value = e.target.value;
        const name = e.target.name;

        this.setState({
            [name]: value
        });
    };

    render() {
        return (
            <div className="container mt-5">
                <Link to="/employees" className="back-link">
                    <i className="fa fa-chevron-circle-left" />
                </Link>
                <SuccessMessage
                    success={this.state.success}
                    message="The employee has been successfully added"
                />
                <ErrorMessage errors={this.state.errors} />

                <h1 className="text-center mb-3">Add Employee</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="first_name">First Name *</label>
                        <input
                            type="text"
                            className="form-control"
                            name="first_name"
                            id="first_name"
                            placeholder="First Name"
                            value={this.state.first_name}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="last_name">Last Name *</label>
                        <input
                            type="text"
                            className="form-control"
                            name="last_name"
                            id="last_name"
                            placeholder="Last Name"
                            value={this.state.last_name}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="company">Company</label>
                        <select
                            name="companies_id"
                            value={this.state.companies_id}
                            id="companies_id"
                            onChange={this.handleChange}
                            className="custom-select"
                        >
                            <option value="">Select Company</option>
                            {this.state.companiesList.map(company => (
                                <option key={company.id} value={company.id}>
                                    {company.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="text"
                            className="form-control"
                            name="email"
                            id="email"
                            placeholder="Email"
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Phone</label>
                        <input
                            type="text"
                            className="form-control"
                            name="phone"
                            id="phone"
                            placeholder="Phone"
                            value={this.state.phone}
                            onChange={this.handleChange}
                        />
                    </div>
                    <button type="submit" className=" btn btn-success w-100">
                        Add
                    </button>
                </form>
            </div>
        );
    }
}
