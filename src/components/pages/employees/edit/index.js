import React, { Component } from "react";
import "./index.scss";
import Api from "api";
import ErrorMessage from "components/base-components/error-message";
import SuccessMessage from "components/base-components/success-message";
import BackLink from "components/base-components/back-link";
import TextInput from "components/base-components/text-input";
import SuccessButton from "components/base-components/success-button";
import FormTitle from "components/base-components/form-title";
import SelectInput from "components/base-components/select-input";

export default class EmployeesEdit extends Component {
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
        const { id } = this.props.match.params;
        if (isNaN(id)) {
            this.props.history.push("/error-404");
        }

        this.api
            .getEmployee(id)
            .then(response => {
                let data = {};
                Object.keys(response.data).map(key => {
                    if (response.data[key] != null) {
                        return (data[key] = response.data[key]);
                    } else {
                        return false;
                    }
                });
                this.setState({
                    ...data
                });
                this.api.getCompaniesForEmployee().then(res => {
                    this.setState({
                        companiesList: res.data
                    });
                });
            })
            .catch(err => {
                if (err.response.status === 404) {
                    this.props.history.push("/error-404");
                }
                console.error(err.response.data);
            });
    }

    handleSubmit = e => {
        e.preventDefault();
        const { id } = this.props.match.params;
        const formData = new FormData();
        formData.append("first_name", this.state.first_name);
        formData.append("last_name", this.state.last_name);
        formData.append("companies_id", this.state.companies_id);
        formData.append("email", this.state.email);
        formData.append("phone", this.state.phone);
        formData.append("_method", "PUT");

        this.api
            .updateEmployee(id, formData)
            .then(response => {
                if(response.status === 200){
                    this.setState({
                        errors: [],
                        success: true
                    });
                }
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
                <BackLink url='/employees'/>
                <SuccessMessage
                    success={this.state.success}
                    message="The employee has been successfully added"
                />
                <ErrorMessage errors={this.state.errors} />

                <FormTitle title='Edit Employee' />
                <form onSubmit={this.handleSubmit}>
                    <TextInput
                        title='First Name'
                        name='first_name'
                        value={this.state.first_name}
                        onChange={this.handleChange}
                        required
                    />
                    <TextInput
                        title='Last Name'
                        name='last_name'
                        value={this.state.last_name}
                        onChange={this.handleChange}
                        required
                    />
                    <SelectInput
                        title='Company'
                        name='companies_id'
                        value={this.state.companies_id}
                        data={this.state.companiesList}
                        onChange={this.handleChange}
                    />
                    <TextInput
                        title='Email'
                        name='email'
                        value={this.state.email}
                        onChange={this.handleChange}
                        type='email'
                    />
                    <TextInput
                        title='Phone'
                        name='phone'
                        value={this.state.phone}
                        onChange={this.handleChange}
                    />
                    <SuccessButton title='Edit Employee'/>
                </form>
            </div>
        );
    }
}
