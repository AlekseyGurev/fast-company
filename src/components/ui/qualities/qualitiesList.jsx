import React from "react";
import PropTypes from "prop-types";
import Qualitie from "../qualities/qualitie";
import { useQualities } from "../../../hooks/useQualities";

const QualitiesList = ({ qualities }) => {
    const { isLoading } = useQualities();
    if (isLoading) return "Loading...";
    return <>
        {qualities.map((qualitie) => (
            <Qualitie key={qualitie} id={qualitie} />
        ))}
    </>;
};

QualitiesList.propTypes = {
    qualities: PropTypes.array
};

export default QualitiesList;
