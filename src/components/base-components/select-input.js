import React from 'react';

const SelectInput = (props) => {
    const {title , name , value , data , onChange , required = false} = props;

    return(
        <div className="form-group">
            <label htmlFor={name}>{title}</label>
            <select
                name={name}
                value={value}
                id={name}
                onChange={onChange}
                className="custom-select"
                required={required}
            >
                <option value="">Select {title}</option>
                {data.map(item => (
                    <option key={item.id} value={item.id}>
                        {item.name}
                    </option>
                ))}
            </select>
        </div>
    )
};
export default SelectInput;