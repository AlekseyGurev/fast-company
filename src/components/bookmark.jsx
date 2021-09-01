import React from "react";
import PropTypes from "prop-types";
import "bootstrap-icons/font/bootstrap-icons.css";

const BookMark = ({ status, id, onBookMark }) => {
    const classBookMark = (status) => {
        let classes = "bi bi-bookmark";
        if (status) {
            return (classes += "-heart-fill");
        } else {
            return classes;
        }
    };
    return (
        <button onClick={() => onBookMark(id)} className="btn btn-secondary">
            <i className={classBookMark(status)}></i>
        </button>
    );
};

BookMark.propTypes = {
    status: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired,
    onBookMark: PropTypes.func.isRequired
};

export default BookMark;
