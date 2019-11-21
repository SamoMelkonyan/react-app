import React , {Component} from 'react';
import {Link} from 'react-router-dom';
import './index.scss';
import Api from "../../../api";
export default class EmployeesItem extends Component {
    api = new Api();

    render() {
        return (
            <>
                {this.props.items && this.props.items.map(item => {
                    return (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.first_name}</td>
                            <td>{item.last_name}</td>
                            <td>{item.companies_id}</td>
                            <td><a href={`mailto:${item.email}`}>{item.email}</a></td>
                            <td><a href={`tel:${item.phone}`}>{item.phone}</a></td>
                            <td className="actions">
                                <Link to={`/employees/${item.id}`}><i className="fa fa-eye"/></Link>
                                <Link to={`/employees/${item.id}/edit`}><i className="fa fa-edit"/></Link>
                                <span onClick={() => this.props.delete(item.id)}><i className="fa fa-trash"/></span>
                            </td>
                        </tr>
                    )
                })}
            </>
        )
    }
}