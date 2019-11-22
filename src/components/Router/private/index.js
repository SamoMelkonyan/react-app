import React , {Component} from 'react';
import {Route , Redirect} from 'react-router-dom';



export default class PrivateRouter extends Component{


    state = {
        isLoggedIn: true,
        user: {}
    };

    componentDidMount() {
        let state = localStorage["appState"];
        if (state) {
            let AppState = JSON.parse(state);
            this.setState({ isLoggedIn: AppState.isLoggedIn, user: AppState });
        }else{
            this.setState({
                isLoggedIn : false,
            })
        }
    }


    render() {
        const { component: Component, ...rest } = this.props;
        return(
            <Route {...rest} render={(props) => (
                this.state.isLoggedIn ? <Component {...props} /> : <Redirect to='/login'/>
            )} />
        )
    }
}


