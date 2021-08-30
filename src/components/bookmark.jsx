import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";

const BookMark = ({ status, id, onBookMark }) => {
  const classBookMark = (status) => {
    let classes = "bi bi-bookmark";
    if (status) {
      return (classes += "-fill");
    } else {
      return classes;
    }
  };
  return (
    <i onClick={() => onBookMark(id)} className={classBookMark(status)}></i>
  );
};

export default BookMark;
