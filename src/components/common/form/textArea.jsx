import React from "react";
import PropTypes from "prop-types";

const TextArea = ({ name, rows, onChange, value }) => {
    return (<div className="form-group mb-4">
        <label htmlFor="exampleFormControlTextarea1">{name}</label>
        <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows={rows} onChange={onChange}
            value={value}
        >
            {value}
        </textarea>
    </div>);
};

TextArea.propTypes = {
    name: PropTypes.string,
    rows: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string
};
export default TextArea;
