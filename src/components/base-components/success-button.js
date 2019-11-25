import React from 'react';

const SuccessButton = (props) => {
    return(
        <button type="submit" className="btn btn-success w-100">
            {props.title}
        </button>
    )
};
export default SuccessButton;