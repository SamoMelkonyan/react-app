import React, { Component } from "react";
import "./index.scss";
import BackLink from "components/base-components/back-link";
import {showEmployee} from "store/actions/employees";
import {showCompany} from "store/actions/companies";
import {connect} from "react-redux";

class EmployeesShow extends Component {
    end = false;
    componentDidMount() {
        const { id } = this.props.match.params;
        if (isNaN(id)) {
            this.props.history.push("/error-404");
        }
        this.props.showEmployee(id);
    }
    componentDidUpdate() {
        if(!this.props.employees.hasPage){
            this.props.history.push('/error-404');
        }
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        const {companies_id} = nextProps.employees.data;
        if(companies_id && this.end === false){
            nextProps.showCompany(companies_id);
            this.end = true;
        }
    }


    render() {
        const {
            first_name,
            last_name,
            email,
            phone,
            created_at,
            updated_at
        } = this.props.employees.data;
        return (
            <div className="container employee-show-container">
                <BackLink url='/employees'/>
                <div className="row">
                    <div className="card bg-light pt-3 pb-3 col-6 m-auto">
                        <h1 className="text-center mb-3">
                            {first_name} {last_name}
                        </h1>
                        <div className="text-center">Company : {this.props.companies.data.name}</div>
                        <div className="text-center">
                            Email : <a href={`mailto:${email}`}>{email}</a>
                        </div>
                        <div className="text-center">
                            Phone : <a href={`tel:${phone}`}>{phone}</a>
                        </div>
                        <div className="text-center">
                            Created At : {created_at}
                        </div>
                        <div className="text-center">
                            Updated At : {updated_at}
                        </div>
                    </div>
                </div>
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
        showEmployee: id => dispatch(showEmployee(id)),
        showCompany: id => dispatch(showCompany(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeesShow);
