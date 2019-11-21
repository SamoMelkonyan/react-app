import React , {Component} from 'react';
import {Link} from 'react-router-dom';
import './index.css';
import Api from "../../../api";
export default class Item extends Component {
    api = new Api();

    render() {
        return (
            <>
                {this.props.items && this.props.items.map(item => {
                    return (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td><a href={`mailto:${item.email}`}>{item.email}</a></td>
                            <td>
                                {item.logo ? <img src={this.api.getImage(item.logo)} alt={item.name} /> : ''}
                            </td>
                            <td><a href={item.website} target="_blank" rel='noopener noreferrer'>{item.website}</a></td>
                            <td className="actions">
                                <Link to={`/companies/${item.id}`}><i className="fa fa-eye"/></Link>
                                <Link to={`/companies/${item.id}/edit`}><i className="fa fa-edit"/></Link>
                                <span><i className="fa fa-trash"/></span>
                            </td>
                        </tr>
                    )
                })}
            </>
        )
    }
}