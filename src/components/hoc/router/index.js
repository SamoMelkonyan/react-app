import React, { Component } from "react";
import { BrowserRouter, Switch } from "react-router-dom";

import Header from "components/base-components/header";
import ErrorPage from "components/pages/error-404";

import PrivateRouter from "./private";
import PublicRouter from "./public";

import Welcome from "components/pages/welcome";
import Login from "components/pages/login";

import Home from "components/pages/home";

import Companies from "components/pages/companies/index";
import CompaniesCreate from "components/pages/companies/create";
import CompaniesShow from "components/pages/companies/show";
import CompaniesEdit from "components/pages/companies/edit";

import Employees from "components/pages/employees/index";
import EmployeesCreate from "components/pages/employees/create";
import EmployeesShow from "components/pages/employees/show";
import EmployeesEdit from "components/pages/employees/edit";
import Api from "api";

export default class Router extends Component {
    api = new Api();
    state = {
        isLoggedIn: false,
    };

    componentDidMount() {
        let token = localStorage["token"];
        if (token) {
            this.setState({
                isLoggedIn: true
            });
        }
    }

    _loginUser = (email, password) => {
        var formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);

        this.api
            .signIn(formData)
            .then(response => {
                return response;
            })
            .then(json => {
                if (json.status === 200) {
                    localStorage["token"] = JSON.stringify(json.data);
                    this.setState({
                        isLoggedIn: true,
                    });
                } else alert("login Failed!");
            })
            .catch(error => {
                alert(`An Error Occured! ${error}`);
            });
    };

    _logoutUser = () => {
        if (!window.confirm("Logout ?")) {
            return false;
        }
        localStorage.removeItem('token');
        this.setState({
            isLoggedIn : false,
        });
        window.location.pathname = "/";
    };

    render() {
        return (
            <BrowserRouter>
                <Header
                    isLoggedIn={this.state.isLoggedIn}
                    logoutUser={this._logoutUser}
                />
                <Switch>
                    <PublicRouter path="/" exact component={Welcome} />
                    <PublicRouter
                        path="/login"
                        exact
                        component={Login}
                        isLoggedIn={this.state.isLoggedIn}
                        loginUser={this._loginUser}
                    />

                    <PrivateRouter path="/home" exact component={Home} />

                    <PrivateRouter
                        path="/companies"
                        exact
                        component={Companies}
                    />
                    <PrivateRouter
                        path="/companies/create"
                        exact
                        component={CompaniesCreate}
                    />
                    <PrivateRouter
                        path="/companies/:id"
                        exact
                        component={CompaniesShow}
                    />
                    <PrivateRouter
                        path="/companies/:id/edit"
                        exact
                        component={CompaniesEdit}
                    />

                    <PrivateRouter
                        path="/employees"
                        exact
                        component={Employees}
                    />
                    <PrivateRouter
                        path="/employees/create"
                        exact
                        component={EmployeesCreate}
                    />
                    <PrivateRouter
                        path="/employees/:id"
                        exact
                        component={EmployeesShow}
                    />
                    <PrivateRouter
                        path="/employees/:id/edit"
                        exact
                        component={EmployeesEdit}
                    />

                    <PublicRouter path="*" component={ErrorPage} />
                </Switch>
            </BrowserRouter>
        );
    }
}
