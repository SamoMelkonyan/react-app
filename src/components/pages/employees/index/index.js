import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./index.scss";
import Paginate from "components/base-components/paginate";
import SuccessMessage from "components/base-components/success-message";
import ErrorMessage from "components/base-components/error-message";
import EmployeesItem from "./item";
import { getEmployees , deleteEmployee } from "store/actions/employees";
import {connect} from "react-redux";


class Employees extends Component {
    componentDidMount() {
        this.props.getEmployees();
    }

    render() {
        const {data : {last_page , current_page , data} , success , errors} = this.props.employees;
        return (
            <div className="container employees-container mt-5">
                <SuccessMessage
                    message="The employee has been successfully removed"
                    success={success}
                />
                <ErrorMessage errors={errors} />
                <Link to="/employees/create" className="btn btn-success mb-1">
                    Add Employee
                </Link>
                <div className="table-responsive">
                    <table className="table table-striped table-dark text-center text-nowrap">
                        <thead>
                            <tr>
                                <td>Id</td>
                                <td>First Name</td>
                                <td>Last Name</td>
                                <td>Company ID</td>
                                <td>Email</td>
                                <td>Phone</td>
                                <td>Actions</td>
                            </tr>
                        </thead>
                        <tbody>
                            <EmployeesItem
                                items={data}
                                delete={id => {
                                    if(!window.confirm('Are you sure?')){
                                        return false
                                    }
                                    return this.props.deleteEmployee(id)
                                }}
                            />
                        </tbody>
                    </table>
                </div>
                <div className="d-flex justify-content-center">
                    <nav aria-label="Page navigation example">
                        <ul className="pagination">
                            <Paginate
                                total={last_page}
                                currentPage={current_page}
                                click={page => this.props.getEmployees(page)}
                            />
                        </ul>
                    </nav>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        employees: state.employees
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getEmployees: page => {dispatch(getEmployees(page))},
        deleteEmployee: id => {dispatch(deleteEmployee(id))}
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Employees);