import React , {Component} from 'react';
import './index.scss';
import {Link} from 'react-router-dom';

export default class Header extends Component{


    render(){
        return(
            <header className='bg-dark p-3 d-flex justify-content-between align-items-center'>
                {!this.props.isLoggedIn ?
                    <Link to='/' className='text-light'><i className='fa fa-home'/></Link> :
                    <Link to='/home' className='text-light'><i className='fa fa-home'/></Link>
                }
                {!this.props.isLoggedIn ?
                    <Link to='/login' className='text-light'>Login</Link> :
                    <div className='d-flex align-items-center justify-content-center'>
                        <Link to='/home' className='text-light'>{this.props.userName}</Link>
                        <span onClick={() => this.props.logoutUser()} className='btn btn-outline-danger ml-3'>Logout</span>
                    </div>
                }
            </header>
        )
    }
}
