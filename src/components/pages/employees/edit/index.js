import React, { Component } from "react";
import {connect} from "react-redux";
import "./index.scss";
import ErrorMessage from "components/base-components/error-message";
import SuccessMessage from "components/base-components/success-message";
import BackLink from "components/base-components/back-link";
import TextInput from "components/base-components/text-input";
import SuccessButton from "components/base-components/success-button";
import FormTitle from "components/base-components/form-title";
import SelectInput from "components/base-components/select-input";
import {updateEmployee , showEmployee} from "store/actions/employees";
import {getAllCompanies} from "store/actions/companies";

class EmployeesEdit extends Component {

    state = {
        first_name: "",
        last_name: "",
        companies_id: "",
        email: "",
        phone: "",
    };
    UNSAFE_componentWillReceiveProps(nextProps) {
        if(nextProps.employees.success){
            nextProps.employees.errors = [];
        }
        let data = {};
        Object.keys(nextProps.employees.data).map(key => {
            if (nextProps.employees.data[key] != null) {
                return data[key] = nextProps.employees.data[key];
            } else {
                return false;
            }
        });
        this.setState({
            ...data
        });

    }

    componentDidMount() {
        const { id } = this.props.match.params;
        if (isNaN(id)) {
            this.props.history.push("/error-404");
        }
        this.props.showEmployee(id);
    }

    componentDidUpdate( ) {
        if(!this.props.employees.hasPage){
            this.props.history.push('/error-404');
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        const { id } = this.props.match.params;
        this.props.updateEmployee(id , this.state);
    };
    handleChange = e => {
        const value = e.target.value;
        const name = e.target.name;
        this.setState({
            [name]: value
        });
    };

    render() {
        if(this.props.companies.data.length === undefined) {
            this.props.companies.data = [];
        }
        return (
            <div className="container mt-5">
                <BackLink url='/employees'/>
                <SuccessMessage
                    success={this.props.employees.success}
                    message="The employee has been successfully edited"
                />
                <ErrorMessage errors={this.props.employees.errors} />

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
                        data={this.props.companies.allData}
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


const mapStateToProps = state => {
    return {
        employees: state.employees,
        companies: state.companies
    };
};

const mapDispatchToProps = dispatch => {
    return {
        updateEmployee: (id, data) => dispatch(updateEmployee(id, data)),
        showEmployee: id => dispatch(showEmployee(id)),
        getAllCompanies: dispatch(getAllCompanies())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeesEdit);
