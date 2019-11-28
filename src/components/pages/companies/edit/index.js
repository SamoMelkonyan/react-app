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
import {connect} from "react-redux";
import {updateCompany , showCompany} from "store/actions/companies";

class CompaniesEdit extends Component {
    api = new Api();

    state = {
        name: "",
        email: "",
        website: "",
        logo: "",
        currentImage: "",
    };

    UNSAFE_componentWillReceiveProps(nextProps) {
        if(nextProps.companies.success){
            nextProps.companies.errors = [];
        }
        let data = {};
        Object.keys(nextProps.companies.data).map(key => {
            if (nextProps.companies.data[key] != null) {
                    return data[key] = nextProps.companies.data[key];
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
        this.props.showCompany(id);
    }

    componentDidUpdate() {
        if(!this.props.companies.hasPage){
            this.props.history.push('/error-404');
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        const { id } = this.props.match.params;
        this.props.updateCompany(id , this.state);
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
        const {name, email, currentImage, website} = this.state;
        return (
            <div className="container mt-5 company-edit-container">
                <BackLink url='/companies'/>
                <SuccessMessage
                    success={this.props.companies.success}
                    message="The company has been successfully edited"
                />
                <ErrorMessage errors={this.props.companies.errors} />

                <FormTitle title='Edit Company'/>
                <form onSubmit={this.handleSubmit}>
                    <TextInput
                        title='Company Name'
                        name='name'
                        value={name}
                        onChange={this.handleChange}
                        required
                    />
                    <TextInput
                        title='Email'
                        name='email'
                        value={email}
                        onChange={this.handleChange}
                        type='email'
                    />
                    <FileInput
                        title='Logo'
                        name='logo'
                        refFile={this.refLogoFile}
                        currentImg={currentImage}
                        src={this.api.getImage(currentImage)}
                        alt={this.state.name}
                        onChange={this.handleChange}
                    />
                    <TextInput
                        title='Website'
                        name='website'
                        value={website}
                        onChange={this.handleChange}
                    />
                    <SuccessButton title='Edit Company'/>
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
        updateCompany: (id, data) => dispatch(updateCompany(id, data)),
        showCompany: id => dispatch(showCompany(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CompaniesEdit);
