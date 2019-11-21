import React , {Component} from 'react';
import {BrowserRouter as Router , Route , Switch} from 'react-router-dom';
import './bootstrap.css';
import './index.scss';

import Header from "../Header";
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

import ErrorPage from "../Error-404";

export default class App extends Component{


  render() {
    return(
        <Router>
         <Header />
         <Switch>
             <Route path='/' exact component={Welcome} />
             <Route path='/login' exact component={Login} />
             <Route path='/home' exact component={Home} />

             <Route path='/companies' exact component={Companies}/>
             <Route path='/companies/create' exact component={CompaniesCreate} />
             <Route path='/companies/:id' exact component={CompaniesShow} />
             <Route path='/companies/:id/edit' exact component={CompaniesEdit} />

             <Route path='/employees' exact component={Employees}/>
             <Route path='/employees/create' exact component={EmployeesCreate}/>
             <Route path='/employees/:id' exact component={EmployeesShow} />
             <Route path='/employees/:id/edit' exact component={EmployeesEdit} />

             <Route path="*" component={ErrorPage}/>
         </Switch>
        </Router>
    )
  }
}
