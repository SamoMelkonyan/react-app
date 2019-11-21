import React , {Component} from 'react';
import {Link} from 'react-router-dom';
import './index.css';

export default class Home extends Component {
    render() {
        return(
            <div className="container home-container mt-5">
                <div className="row">
                    <div className="col-6">
                        <Link to='/companies' className="w-100 btn btn-success p-5">Companies</Link>
                    </div>
                    <div className="col-6">
                        <Link to='/employees' className="w-100 btn btn-info text-light p-5">Employees</Link>
                    </div>
                </div>
            </div>
        )
    }
}