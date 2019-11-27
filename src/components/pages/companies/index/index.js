import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./index.scss";

import CompaniesItem from "./item";
import Paginate from "components/base-components/paginate";
import SuccessMessage from "components/base-components/success-message";
import { getCompanies , deleteCompany } from "store/actions/companies";
import ErrorMessage from "../../../base-components/error-message";

class Companies extends Component {

    componentDidMount() {
        this.props.getCompanies();
    }

    render() {
        const {data : {last_page , current_page , data} , success , errors} = this.props.companies;

        return (
            <div className="container companies-container mt-5">
                <SuccessMessage
                    message="The company has been successfully removed"
                    success={success}
                />
                <ErrorMessage errors={errors} />
                <Link to="/companies/create" className="btn btn-success mb-1">
                    Create Company
                </Link>
                <div className="table-responsive">
                    <table className="table table-striped table-dark text-center text-nowrap">
                        <thead>
                            <tr>
                                <td>Id</td>
                                <td>Name</td>
                                <td>Email</td>
                                <td>Logo</td>
                                <td>Website</td>
                                <td>Actions</td>
                            </tr>
                        </thead>
                        <tbody>
                            <CompaniesItem
                                items={data}
                                delete={id => {
                                    if(!window.confirm('Are you sure?')){
                                        return false
                                    }
                                    return this.props.deleteCompany(id)
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
                                click={page => this.props.getCompanies(page)}
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
        companies: state.companies
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getCompanies: page => {dispatch(getCompanies(page))},
        deleteCompany: id => {dispatch(deleteCompany(id))}
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Companies);