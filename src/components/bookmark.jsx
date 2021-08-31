import React from "react";
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

export default BookMark;
