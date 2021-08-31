import React from "react";
import Qualitie from "./qualitie";
import BookMark from "./bookmark";

const User = ({
  _id,
  name,
  qualities,
  profession,
  completedMeetings,
  rate,
  onDelete,
  status,
  onBookMark,
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

export default User;
