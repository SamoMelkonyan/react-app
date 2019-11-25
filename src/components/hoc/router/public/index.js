import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";

export default class PrivateRouter extends Component {
    render() {
        const { component: Component, ...rest } = this.props;

        return (
            <Route
                {...rest}
                render={props =>
                    props.location.pathname === "/login" &&
                    this.props.isLoggedIn ? (
                        <Redirect to="/home" />
                    ) : props.location.pathname === "/login" &&
                      !this.props.isLoggedIn ? (
                        <Component
                            {...props}
                            loginUser={(email, password) =>
                                this.props.loginUser(email, password)
                            }
                        />
                    ) : (
                        <Component {...props} />
                    )
                }
            />
        );
    }
}
