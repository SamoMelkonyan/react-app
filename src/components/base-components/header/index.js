import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./index.scss";
import {getAllCompanies} from "store/actions/companies";
import {getAllEmployees} from "store/actions/employees";

class Header extends Component {

    render() {
            this.props.isLoggedIn && this.props.getAllCompanies();
            this.props.isLoggedIn && this.props.getAllEmployees();
        return (
            <header className="bg-dark p-3 d-flex justify-content-between align-items-center">
                {!this.props.isLoggedIn ? (
                    <>
                    <Link to="/" className="text-light">
                        <i className="fa fa-home" />
                    </Link>
                    <Link to="/login" className="text-light">
                        Login
                    </Link>
                    </>
                ) : (
                    <>
                    <Link to="/home" className="text-light">
                        <i className="fa fa-home" />
                    </Link>
                        <h4 className='m-0 text-success'>Companies : {this.props.companiesCount}</h4>
                        <h4 className='m-0 text-success'>Employees : {this.props.employeesCount}</h4>
                        <div
                            onClick={() => this.props.logoutUser()}
                            className="btn btn-outline-danger ml-3" >
                            Logout
                        </div>
                    </>
                )}
            </header>
        );
    }
}

const mapStateToProps = state => {
    return {
        companiesCount: state.companies.allData.length,
        employeesCount: state.employees.allData.length
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllCompanies: () => dispatch(getAllCompanies()),
        getAllEmployees: () => dispatch(getAllEmployees())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);