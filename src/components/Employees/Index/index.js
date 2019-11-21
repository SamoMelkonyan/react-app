import React , {Component} from 'react';
import {Link} from 'react-router-dom';
import './index.scss';
import Api from "../../../api";
import Paginate from "../../BaseComponents/paginate";
import SuccessMessage from "../../BaseComponents/successMessage";
import EmployeesItem from "./item";

export default class Employees extends Component {
    api = new Api();
    state = {
        employees: {
            data: [],
            currentPage: null,
            total: null,
            removed : false,
        }
    };
    componentDidMount() {
        this.api.getEmployees().then(res => {
            this.setState({
                employees : {
                    data: res.data.data,
                    currentPage: res.data.current_page,
                    total: res.data.last_page,
                    removed : false,
                }
            });
        });
    }
    paginate(page){
        this.api.getEmployees(page).then(res => {
            this.setState({
                employees : {
                    data: res.data.data,
                    currentPage: res.data.current_page,
                    total: res.data.last_page,
                    removed: false,
                }
            });
        });
    }
    deleteEmployee(id){
        if(!window.confirm('Are you sure?')){
            return false;
        }
        this.api.destroyEmployee(id).then(response => {
            let data = [...this.state.employees.data];
            data = data.filter(employee => employee.id !== id);
            this.setState({
                employees : {
                    ...this.state.employees ,
                    data,
                    removed : response.data.success,
                }
            })
        }).catch(err => {
            console.log(err)
        })
    }
    render() {
        const {data , total , currentPage , removed} = this.state.employees;
        return(
            <div className="container employees-container mt-5">
                <SuccessMessage message='The employee has been successfully removed' success={removed} />
                <Link to='/employees/create' className="btn btn-success mb-1" >Add Employee</Link>
                <div className="table-responsive">
                    <table className="table table-striped table-dark text-center text-nowrap">
                        <thead>
                        <tr>
                            <td>Id</td>
                            <td>First Name</td>
                            <td>Last Name</td>
                            <td>Company ID</td>
                            <td>Email</td>
                            <td>Phone</td>
                            <td>Actions</td>
                        </tr>
                        </thead>
                        <tbody>
                        <EmployeesItem items={data} delete={(id) => this.deleteEmployee(id)}/>
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