import React , {Component} from 'react';

export default class SuccessMessage extends Component{
    render(){
        if (!this.props.success){
            return false
        }
        return(
            <div className="alert alert-success">
                {this.props.message}
            </div>
        )
    }
}