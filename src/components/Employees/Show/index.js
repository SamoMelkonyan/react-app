import React , {Component} from 'react';
import {Link} from 'react-router-dom';
import Api from "../../../api";
import './index.scss';



export default class EmployeesShow extends Component {
    api = new Api();
    state = {};
    componentDidMount() {
        const {id} = this.props.match.params;
        if(isNaN(id)){
            this.props.history.push('/error-404')
        }
        this.api.getEmployee(id).then(response => {
            let data = {};
            Object.keys(response.data).map((key) => {
                return data[key] = response.data[key]
            });
            this.setState({
                ...data
            });
            if(response.data.companies_id !== null) {
                this.api.getCompany(response.data.companies_id).then(response => {
                    this.setState({
                        company: response.data.name,
                    });
                }).catch(err => {
                    console.error(err.response.data)
                })
            }
        }).catch(err => {
            if(err.response.status === 404){
                this.props.history.push('/error-404')
            }
            console.error(err.response.data)
        });
    }

    render() {
        const {first_name , last_name , company , email , phone , created_at , updated_at} = this.state;
        return(
            <div className="container employee-show-container">
                <Link to="/employees" className="back-link"><i className="fa fa-chevron-circle-left"/></Link>
                <div className="row">
                    <div className="card bg-light pt-3 pb-3 col-6 m-auto">
                        <h1 className="text-center mb-3">{first_name} {last_name}</h1>
                        <div className="text-center">Company : {company}</div>
                        <div className="text-center">Email : <a href={`mailto:${email}`}>{email}</a></div>
                        <div className="text-center">Phone : <a href={`tel:${phone}`}>{phone}</a></div>
                        <div className="text-center">Created At : {created_at}</div>
                        <div className="text-center">Updated At : {updated_at}</div>
                    </div>
                </div>
            </div>
        )
    }
}