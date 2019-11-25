import React, { Component } from "react";
import "./index.scss";
import Api from "api";
import ErrorMessage from "components/base-components/error-message";
import SuccessMessage from "components/base-components/success-message";
import BackLink from "components/base-components/back-link";
import TextInput from "components/base-components/text-input";
import SuccessButton from "components/base-components/success-button";
import FileInput from "components/base-components/file-input";
import FormTitle from "components/base-components/form-title";

export default class CompaniesCreate extends Component {
    api = new Api();
    refLogoFile = React.createRef();
    state = {
        name: "",
        email: "",
        website: "",
        logo: "",
        errors: [],
        success: false
    };

    handleSubmit = e => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", this.state.name);
        formData.append("email", this.state.email);
        formData.append("website", this.state.website);
        if (this.state.logo) {
            formData.append("logo", this.state.logo);
        }

        this.api
            .setCompany(formData)
            .then(response => {
                if(response.status === 200){
                    this.setState({
                        name: "",
                        email: "",
                        website: "",
                        logo: "",
                        errors: [],
                        success: true
                    });
                    this.refLogoFile.current.value = "";
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
        return (
            <div className="container mt-5">
                <BackLink url='/companies'/>
                <SuccessMessage
                    success={this.state.success}
                    message="The company has been successfully added"
                />
                <ErrorMessage errors={this.state.errors} />
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
