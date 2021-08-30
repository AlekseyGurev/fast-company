import React from "react";
import Qualitie from "./qualitie";
import BookMark from "./bookmark";

const User = ({ user, onDelete, status, onBookMark }) => {
  return (
    <tr>
      <td>{user.name}</td>
      <td>
        {user.qualities.map((qualitie) => (
          <Qualitie
            key={qualitie._id}
            color={qualitie.color}
            id={qualitie._id}
            name={qualitie.name}
          />
        ))}
      </td>
      <td>{user.profession.name}</td>
      <td>{user.completedMeetings}</td>
      <td>{user.rate}</td>
      <td>
        <BookMark status={status} id={user._id} onBookMark={onBookMark} />
      </td>
      <td>
        <button
          onClick={() => onDelete(user._id)}
          className="btn btn-danger btn-sm"
        >
          Удалить
        </button>
      </td>
    </tr>
  );
};

export default User;
