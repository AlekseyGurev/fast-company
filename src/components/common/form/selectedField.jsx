import React from "react";
import PropTypes from "prop-types";

const SelectedField = ({
    label,
    value,
    onChange,
    defaultOption,
    options,
    error

}) => {
    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };
    const getInputClasses = () => {
        return "form-select " + (error ? "is-invalid" : "");
    };
    const optionsArray = !Array.isArray(options) && typeof (options) === "object"
        ? Object.keys(options).map(optionName => ({ name: options[optionName].name, value: options[optionName]._id }))
        : options;
    return (<div className="mb-4">
        <label htmlFor="validationCustom04" className="form-label">{label}</label>
        <select
            className={getInputClasses()}
            id="validationCustom04"
            name="profession"
            value={value}
            onChange={handleChange}
        >
            <option disabled value="">{ defaultOption }</option>
            {optionsArray && optionsArray.map(option => <option
                value={option.value}
                key={option.value}

            >
                {option.name}
            </option>)}
        </select>
        {
            error && <div className="invalid-feedback">
                {error}
            </div>
        }
    </div>);
};

SelectedField.propTypes = {
    label: PropTypes.string,
    defaultOption: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    error: PropTypes.string
};

export default SelectedField;
