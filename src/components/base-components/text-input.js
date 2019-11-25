import React from 'react';

const TextInput = (props) => {
    const {title , name , value , onChange , required = false , type = 'text'} = props;

    return(
        <div className="form-group">
            <label htmlFor={name}>{title} {required && '*'}</label>
            <input
                type={type}
                className="form-control"
                name={name}
                id={name}
                placeholder={title}
                value={value}
                onChange={onChange}
                required={required}
            />
        </div>
    )
};
export default TextInput;