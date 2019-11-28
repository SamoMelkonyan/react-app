import React, { Component } from "react";
import Api from "api";
import "./index.scss";
import BackLink from "components/base-components/back-link";
import {showCompany} from "store/actions/companies";
import {connect} from "react-redux";

class CompaniesShow extends Component {
    api = new Api();

    componentDidMount() {
        const { id } = this.props.match.params;
        if (isNaN(id)) {
            this.props.history.push("/error-404");
        }
        this.props.showCompany(id)
    }
    componentDidUpdate() {
        if(!this.props.companies.hasPage){
            this.props.history.push('/error-404');
        }
    }

    render() {
        const {
            name,
            email,
            website,
            logo,
            created_at,
            updated_at,
        } = this.props.companies.data;
        return (
            <div className="container company-show-container">
                <BackLink url='/companies'/>
                <div className="row">
                    <div className="card bg-light pt-3 pb-3 col-6 m-auto">
                        <h1 className="text-center mb-3">{name}</h1>
                        <div className="text-center">
                            Email : <a href={`mailto:${email}`}>{email}</a>
                        </div>
                        <div className="text-center">
                            Website :{" "}
                            <a
                                href={website}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {website}
                            </a>
                        </div>
                        <div className="text-center">
                            Created At : {created_at}
                        </div>
                        <div className="text-center">
                            Updated At : {updated_at}
                        </div>
                        <div className="text-center">
                            {logo && (
                                <img src={this.api.getImage(logo)} alt={name} />
                            )}
                        </div>
                    </div>
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
        showCompany: id => dispatch(showCompany(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CompaniesShow);
