import React , {Component} from 'react';
import {Link} from 'react-router-dom';
import './index.scss';
import Api from "../../../api";
import CompaniesItem from "./item";
import Paginate from "../../BaseComponents/paginate";
import SuccessMessage from "../../BaseComponents/successMessage";

export default class Companies extends Component {
    api = new Api();
    state = {
        companies: {
            data: [],
            currentPage: null,
            total: null,
            removed : false,
        }
    };
    componentDidMount() {
        this.api.getCompanies().then(res => {
            this.setState({
                companies : {
                    data: res.data.data,
                    currentPage: res.data.current_page,
                    total: res.data.last_page,
                    removed: false
                }
            });
        });
    }
    paginate(page){
        this.api.getCompanies(page).then(res => {
            this.setState({
                companies : {
                    data: res.data.data,
                    currentPage: res.data.current_page,
                    total: res.data.last_page,
                    removed: false,
                }
            });
        });
    }
    deleteCompany(id){
        if(!window.confirm('Are you sure?')){
            return false;
        }
        this.api.destroyCompany(id).then(response => {
            let data = [...this.state.companies.data];
            console.log(response.success)
            data = data.filter(company => company.id !== id);
            this.setState({
                companies : {
                    ...this.state.companies ,
                    data ,
                    removed : response.data.success,
                }
            })
        }).catch(err => {
            console.log(err)
        })
    }
    render() {
        const {data , total , currentPage , removed} = this.state.companies;
        return(
            <div className="container companies-container mt-5">
                <SuccessMessage message='The company has been successfully removed' success={removed} />
                <Link to='/companies/create' className="btn btn-success mb-1" >Create Company</Link>
                <div className="table-responsive">
                    <table className="table table-striped table-dark text-center text-nowrap">
                        <thead>
                        <tr>
                            <td>Id</td>
                            <td>Name</td>
                            <td>Email</td>
                            <td>Logo</td>
                            <td>Website</td>
                            <td>Actions</td>
                        </tr>
                        </thead>
                        <tbody>
                            <CompaniesItem items={data} delete={(id) => this.deleteCompany(id)}/>
                        </tbody>
                    </table>
                </div>
                <div className="d-flex justify-content-center">
                    <nav aria-label="Page navigation example">
                        <ul className="pagination">
                            <Paginate total={total} currentPage={currentPage} click={(page) => this.paginate(page)} />
                        </ul>
                    </nav>
                </div>
            </div>
        )
    }
}