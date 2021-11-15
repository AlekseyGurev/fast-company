import React from "react";
import PropTypes from "prop-types";
import Qualitie from "../qualities/qualitie";
import { useQualities } from "../../../hooks/useQualities";

const QualitiesList = ({ qualities }) => {
    const { getQualityId } = useQualities();
    const newArray = [];
    qualities.forEach(element => {
        newArray.push(getQualityId(element));
    });
    return <>
        {newArray.map((qualitie) => (
            <Qualitie key={qualitie._id} {...qualitie} />
        ))}
    </>;
};

QualitiesList.propTypes = {
    qualities: PropTypes.array
};

export default QualitiesList;
