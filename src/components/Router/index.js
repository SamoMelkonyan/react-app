import React , {Component} from 'react';
import {BrowserRouter , Switch } from 'react-router-dom';

import Header from "../Header";
import ErrorPage from "../Error-404";


import PrivateRouter from "./private";
import PublicRouter from "./public";

import Welcome from "../Welcome";
import Login from "../Login";

import Home from "../Home";

import Companies from "../Companies/Index";
import CompaniesCreate from "../Companies/Create";
import CompaniesShow from "../Companies/Show";
import CompaniesEdit from "../Companies/Edit";

import Employees from "../Employees/Index";
import EmployeesCreate from "../Employees/Create";
import EmployeesShow from "../Employees/Show";
import EmployeesEdit from "../Employees/Edit";
import Api from "../../api";

export default class Router extends Component{
    api = new Api();
    state = {
        isLoggedIn: false,
        user: {}
    };

    componentDidMount() {
        let state = localStorage["appState"];
        if (state) {
            let AppState = JSON.parse(state);
            this.setState({ isLoggedIn: AppState.isLoggedIn, user: AppState.user });
        }
    }

    _loginUser = (email, password) => {
        var formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);

        this.api.signIn(formData)
            .then(response => {
                return response;
            })
            .then(json => {
                if (json.data.success) {
                    const { name, id, email, auth_token } = json.data.data;

                    let userData = {
                        name,
                        id,
                        email,
                        auth_token,
                        timestamp: new Date().toString()
                    };
                    let appState = {
                        isLoggedIn: true,
                        user: userData
                    };
                    localStorage["appState"] = JSON.stringify(appState);
                    this.setState({
                        isLoggedIn: appState.isLoggedIn,
                        user: appState.user
                    });
                } else alert("Login Failed!");
            })
            .catch(error => {
                alert(`An Error Occured! ${error}`);
            });
    };

    _logoutUser = () => {
        if(!window.confirm('Logout ?')){
            return false;
        }
        let appState = {
            isLoggedIn: false,
            user: {}
        };
        localStorage["appState"] = JSON.stringify(appState);
        this.setState(appState);
        window.location.pathname = '/';
    };

    render() {
        return(
            <BrowserRouter>
                <Header userName={this.state.user && this.state.user.name} isLoggedIn={this.state.isLoggedIn} logoutUser={this._logoutUser} />
                <Switch>
                    <PublicRouter  path='/' exact component={Welcome}/>
                    <PublicRouter  path='/login' exact component={Login} isLoggedIn={this.state.isLoggedIn} loginUser={this._loginUser} />

                    <PrivateRouter path='/home' exact component={Home}/>

                    <PrivateRouter path='/companies' exact component={Companies}/>
                    <PrivateRouter path='/companies/create' exact component={CompaniesCreate} />
                    <PrivateRouter path='/companies/:id' exact component={CompaniesShow} />
                    <PrivateRouter path='/companies/:id/edit' exact component={CompaniesEdit} />

                    <PrivateRouter path='/employees' exact component={Employees}/>
                    <PrivateRouter path='/employees/create' exact component={EmployeesCreate}/>
                    <PrivateRouter path='/employees/:id' exact component={EmployeesShow} />
                    <PrivateRouter path='/employees/:id/edit' exact component={EmployeesEdit} />

                    <PublicRouter path="*" component={ErrorPage}/>
                </Switch>
            </BrowserRouter>
        )
    }
}
