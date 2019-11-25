import React from 'react';

const FileInput = (props) => {
    const {title , name  , refFile , onChange , src , alt , required = false , currentImg = false} = props;
    return(
        <div className="form-group">
            <label htmlFor={name}>{title}</label>
            <div className='d-flex'>
            {currentImg && <img src={src} alt={alt} /> }
            <input
                type="file"
                className="custom-file"
                name={name}
                id={name}
                onChange={onChange}
                ref={refFile}
                required={required}
            />
            </div>
        </div>
    )
};
export default FileInput;