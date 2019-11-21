import React , {Component} from 'react';
import {BrowserRouter as Router , Route , Switch} from 'react-router-dom';
import './bootstrap.css';
import './index.css';

import Header from "../Header";
import Welcome from "../Welcome";
import Login from "../Login";
import Home from "../Home";

import Companies from "../Companies/Index";
import CompaniesCreate from "../Companies/Create";
import CompaniesShow from "../Companies/Show";
import CompaniesEdit from "../Companies/Edit";

import Employees from "../Employees/Index";

export default class Index extends Component{


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
         </Switch>
        </Router>
    )
  }
}
