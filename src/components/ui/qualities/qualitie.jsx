import React from "react";
import PropTypes from "prop-types";
import { useQualities } from "../../../hooks/useQualities";

const Qualitie = ({ id }) => {
    const { getQualityId } = useQualities();
    const { _id, color, name } = getQualityId(id);
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
    id: PropTypes.string
};
export default Qualitie;
