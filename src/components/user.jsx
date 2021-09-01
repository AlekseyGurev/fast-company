import React from "react";
import Qualitie from "./qualitie";
import BookMark from "./bookmark";
import PropTypes from "prop-types";

const User = ({
    _id,
    name,
    qualities,
    profession,
    completedMeetings,
    rate,
    onDelete,
    status,
    onBookMark
}) => {
    return (
        <tr>
            <td>{name}</td>
            <td>
                {qualities.map((qualitie) => (
                    <Qualitie key={qualitie._id} {...qualitie} />
                ))}
            </td>
            <td>{profession.name}</td>
            <td>{completedMeetings}</td>
            <td>{rate}</td>
            <td>
                <BookMark status={status} id={_id} onBookMark={onBookMark} />
            </td>
            <td>
                <button onClick={() => onDelete(_id)} className="btn btn-danger btn-sm">
          Удалить
                </button>
            </td>
        </tr>
    );
};
User.defaultProps = {
    status: false
};
User.propTypes = {
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    qualities: PropTypes.array.isRequired,
    profession: PropTypes.object.isRequired,
    completedMeetings: PropTypes.number.isRequired,
    rate: PropTypes.number.isRequired,
    onDelete: PropTypes.func.isRequired,
    status: PropTypes.any.isRequired,
    onBookMark: PropTypes.func.isRequired
};

export default User;
