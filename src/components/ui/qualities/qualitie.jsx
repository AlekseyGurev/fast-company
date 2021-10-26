import React from "react";
import PropTypes from "prop-types";

const Qualitie = ({ color, _id, name }) => {
    const getBageclasses = (color) => {
        const classes = `badge m-2 bg-${color}`;
        return classes;
    };

    return (
        <span key={_id} className={getBageclasses(color)}>
            {name}
        </span>
    );
};

Qualitie.propTypes = {
    color: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
};
export default Qualitie;
