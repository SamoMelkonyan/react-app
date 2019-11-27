import React, { Component } from "react";
import {connect} from "react-redux";
import "./index.scss";
import Api from "api";
import ErrorMessage from "components/base-components/error-message";
import SuccessMessage from "components/base-components/success-message";
import BackLink from "components/base-components/back-link";
import TextInput from "components/base-components/text-input";
import SuccessButton from "components/base-components/success-button";
import FileInput from "components/base-components/file-input";
import FormTitle from "components/base-components/form-title";
import { createCompany } from "store/actions/companies";

class CompaniesCreate extends Component {
    api = new Api();
    refLogoFile = React.createRef();
    state = {
        name: "",
        email: "",
        website: "",
        logo: "",
    };

    componentDidMount() {
        this.props.companies.success = false;
        this.props.companies.errors = [];
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.createCompany(this.state);
    };
    handleChange = e => {
        let value = e.target.value;
        const name = e.target.name;
        if (name === "logo") {
            value = e.target.files[0];
        }
        this.setState({
            [name]: value
        });
    };

    render() {
        const {success , errors} = this.props.companies;
        return (
            <div className="container mt-5">
                <BackLink url='/companies'/>
                <SuccessMessage
                    success={success}
                    message="The company has been successfully added"
                />
                <ErrorMessage errors={errors} />
                <FormTitle title='Create Company'/>
                <form onSubmit={this.handleSubmit}>
                    <TextInput
                        title='Company Name'
                        name='name'
                        value={this.state.name}
                        onChange={this.handleChange}
                        required
                    />
                    <TextInput
                        title='Email'
                        name='email'
                        value={this.state.email}
                        onChange={this.handleChange}
                    />
                    <FileInput
                        title='Logo'
                        name='logo'
                        refFile={this.refLogoFile}
                        onChange={this.handleChange}
                    />
                    <TextInput
                        title='Website'
                        name='website'
                        value={this.state.website}
                        onChange={this.handleChange}
                    />
                    <SuccessButton title='Create'/>
                </form>
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
        createCompany: data => dispatch(createCompany(data))
        /*  onDelete: id => {
          dispatch(deletePost(id));
        } */
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CompaniesCreate);