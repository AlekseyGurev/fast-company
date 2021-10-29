import React from "react";
import PropTypes from "prop-types";

const selectedFieldsUserComment = ({
    label,
    value,
    onChange,
    defaultOption,
    options
}) => {
    return (<div className="mb-4">
        <label htmlFor="validationCustom04" className="form-label">{label}</label>
        <select
            className="form-select"
            id="validationCustom04"
            name="users"
            value={value}
            onChange={onChange}
        >
            <option disabled value="">{ defaultOption }</option>
            {options && options.map(option => <option
                value={option.value}
                key={option.value}
            >
                {option.name}
            </option>)}
        </select>
    </div>);
};

selectedFieldsUserComment.propTypes = {
    label: PropTypes.string,
    defaultOption: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

export default selectedFieldsUserComment;
