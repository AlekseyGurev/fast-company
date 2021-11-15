import React, { useContext, useEffect, useState } from "react";
import qualityService from "../services/qualities.service";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

const QualitiesContext = React.createContext();
export const useQualities = () => {
    return useContext(QualitiesContext);
};

export const QualitiesProvider = ({ children }) => {
    const [qualities, setQualities] = useState([]);
    const [errors, setErrors] = useState(null);
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        const getQualities = async() => {
            try {
                const { content } = await qualityService.get();
                setQualities(content);
                setLoading(false);
            } catch (error) {
                errorCatch(error);
            }
        };
        getQualities();
    }, []);

    const getQualityId = (id) => {
        return qualities.find((q) => q._id === id);
    };
    function errorCatch(error) {
        const { message } = error.response.data;
        setErrors(message);
    }

    useEffect(() => {
        if (errors !== null) {
            toast.error(errors);
            setErrors(null);
        }
    }, [errors]);

    return (
        <QualitiesContext.Provider
            value={{
                qualities,
                getQualityId
            }}
        >
            {!isLoading ? children : "<h1>Qualities Loading...</h1>"}
        </QualitiesContext.Provider>
    );
};
QualitiesProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
