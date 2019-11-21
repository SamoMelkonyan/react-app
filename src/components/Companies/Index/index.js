import React , {Component} from 'react';
import {Link} from 'react-router-dom';
import './index.css';
import Api from "../../../api";
import Item from "./item";
import Paginate from "./paginate";


export default class Companies extends Component {
    api = new Api();
    state = {
        companies: {
            data: [],
            currentPage: null,
            total: null,
        }
    };
    componentDidMount() {
        this.api.getCompanies().then(res => {
            this.setState({
                companies : {
                    data: res.data.data,
                    currentPage: res.data.current_page,
                    total: res.data.last_page,
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
                }
            });
        });
    }
    render() {
        const {data , total , currentPage} = this.state.companies;
        return(
            <div className="container companies-container mt-5">
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
                            <Item items={data}/>
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