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

export default class CompaniesEdit extends Component {
    api = new Api();
    refLogoFile = React.createRef();
    state = {
        name: "",
        email: "",
        website: "",
        logo: "",
        currentImage: "",
        errors: [],
        success: false
    };

    componentDidMount() {
        const { id } = this.props.match.params;
        if (isNaN(id)) {
            this.props.history.push("/error-404");
        }

        this.api
            .getCompany(id)
            .then(response => {
                let data = {};
                Object.keys(response.data).map(key => {
                    if (response.data[key] != null) {
                        if (key !== "logo") {
                            return (data[key] = response.data[key]);
                        } else {
                            return (data["currentImage"] = response.data[key]);
                        }
                    } else {
                        return false;
                    }
                });
                this.setState({
                    ...data
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
        formData.append("name", this.state.name);
        formData.append("email", this.state.email);
        formData.append("website", this.state.website);
        this.state.logo && formData.append("logo", this.state.logo);
        formData.append("_method", "PUT");

        this.api
            .updateCompany(id, formData)
            .then(response => {
                if(response.status === 200){
                    this.setState({
                        errors: [],
                        success: true,
                        currentImage: response.data.image
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
        let name = e.target.name;
        if (name === "logo") {
            value = e.target.files[0];
        }
        this.setState({
            [name]: value
        });
    };

    render() {
        return (
            <div className="container mt-5 company-edit-container">
                <BackLink url='/companies'/>
                <SuccessMessage
                    success={this.state.success}
                    message="The company has been successfully edited"
                />
                <ErrorMessage errors={this.state.errors} />

                <FormTitle title='Edit Company'/>
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
                        currentImg={this.state.currentImage}
                        src={this.api.getImage(
                            this.state.currentImage
                        )}
                        alt={this.state.name}
                        onChange={this.handleChange}
                    />
                    <TextInput
                        title='Website'
                        name='website'
                        value={this.state.website}
                        onChange={this.handleChange}
                    />
                    <SuccessButton title='Edit Company'/>
                </form>
            </div>
        );
    }
}
