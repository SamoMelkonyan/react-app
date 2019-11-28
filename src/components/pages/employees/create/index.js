import React, { Component } from "react";
import "./index.scss";
import ErrorMessage from "components/base-components/error-message";
import SuccessMessage from "components/base-components/success-message";
import BackLink from "components/base-components/back-link";
import TextInput from "components/base-components/text-input";
import SuccessButton from "components/base-components/success-button";
import FormTitle from "components/base-components/form-title";
import SelectInput from "components/base-components/select-input";
import { createEmployee } from "store/actions/employees";
import {connect} from "react-redux";
import {getAllCompanies} from "store/actions/companies";

class EmployeesCreate extends Component {
    state = {
        first_name: "",
        last_name: "",
        companies_id: "",
        email: "",
        phone: "",
    };

    componentDidMount() {
        this.props.employees.success = false;
        this.props.employees.errors = [];
    }

    handleSubmit = async e => {
        e.preventDefault();
        await this.props.createEmployee(this.state);
    };
    handleChange = e => {
        let value = e.target.value;
        const name = e.target.name;
        this.setState({
            [name]: value
        });
    };
    UNSAFE_componentWillReceiveProps(nextProps) {
        if(nextProps.employees.success) {
            nextProps.employees.errors = [];
            this.setState({
                first_name: "",
                last_name: "",
                companies_id: "",
                email: "",
                phone: "",
            });
        }
    }

    render() {
        const {success , errors} = this.props.employees;
        return (
            <div className="container mt-5">
                <BackLink url='/employees'/>
                <SuccessMessage
                    success={success}
                    message="The employee has been successfully added"
                />
                <ErrorMessage errors={errors} />

                <FormTitle title='Add Employee' />
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
                        data={this.props.companies.data}
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
                    <SuccessButton title='Add Employee'/>
                </form>
            </div>
        );
    }
}



const mapStateToProps = state => {
    return {
        employees: state.employees,
        companies: state.companies
    };
};

const mapDispatchToProps = dispatch => {
    return {
        createEmployee: data => dispatch(createEmployee(data)),
        getAllCompanies: dispatch(getAllCompanies())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeesCreate);