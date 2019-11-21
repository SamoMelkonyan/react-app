import React , {Component} from 'react';
import {Link} from "react-router-dom";
import './index.scss';
export default class ErrorPage extends Component{
    componentDidMount() {
        this.props.history.push('/error-404')
    }

    render(){
        return(
            <div className='container mt-5 text-center'>
                <h1 className='display-1'>ERROR 404</h1>
                <h4 className='display-4'>Page not a found</h4>
                <Link to='/' className='btn btn-success'>Home</Link>
            </div>
        )
    }
}