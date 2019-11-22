import React , {Component} from 'react';

import './index.scss';

export default class Login extends Component {

    state = {};

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.loginUser(this.state.email , this.state.password)
    };
    handleChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;

        this.setState({
            [name]: value,
        });
    };
    render() {

        return(
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Login</div>

                            <div className="card-body">
                                <form onSubmit={this.handleSubmit} method="POST">
                                    <div className="form-group row">
                                        <label htmlFor="email" className="col-md-4 col-form-label text-md-right">E-Mail Address</label>

                                        <div className="col-md-6">
                                            <input
                                                id="email" type="email"
                                                className="form-control"
                                                name="email"
                                                required
                                                autoComplete="email"
                                                autoFocus
                                                onChange={this.handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="password" className="col-md-4 col-form-label text-md-right">Password</label>

                                        <div className="col-md-6">
                                            <input id="password"
                                                   type="password"
                                                   className="form-control"
                                                   name="password"
                                                   required
                                                   autoComplete="current-password"
                                                   onChange={this.handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group row mb-0">
                                        <div className="col-md-8 offset-md-4">
                                            <button type="submit" className="btn btn-primary">
                                                Login
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}