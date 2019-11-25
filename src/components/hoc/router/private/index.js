import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";

export default class PrivateRouter extends Component {
    state = {
        isLoggedIn: true,
    };

    componentDidMount() {
        let state = localStorage["token"];
        if (state) {
            this.setState({ isLoggedIn: true});
        } else {
            this.setState({ isLoggedIn: false });
        }
    }

    render() {
        const { component: Component, ...rest } = this.props;
        return (
            <Route
                {...rest}
                render={props =>
                    this.state.isLoggedIn ? (
                        <Component {...props} />
                    ) : (
                        <Redirect to="/login" />
                    )
                }
            />
        );
    }
}
