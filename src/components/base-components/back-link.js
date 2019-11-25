import React from "react";
import {Link} from "react-router-dom";

const BackLink = (props) => {
    return(
        <Link to={props.url} className="back-link">
            <i className="fa fa-chevron-circle-left"/>
        </Link>
    )
};
export default BackLink;