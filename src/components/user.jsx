import React, { useState } from "react";
import api from "../API";

const Users = () => {
  let table = document.querySelector("#table");
  const [users, setUsers] = useState(api.users.fetchAll());

  const handleDelete = (userId) => {
    setUsers(users.filter((user) => user._id !== userId));
  };
  const renderPhrase = (number) => {
    let classes = "h1 badge bg-";
    let result;
    if (number === 0) {
      classes += "danger";
      result = `Никто не тусанет сегодня с тобой`;
      table.classList.add("d-none");
    } else {
      classes += "primary";
      result = `${number} человек тусанет с тобой сегодня`;
    }
    return (
      <h2>
        <span className={classes}>{result}</span>
      </h2>
    );
  };

  const userRow = (user) => {
    return (
      <tr key={user._id}>
        <td>{user.name}</td>
        <td>{user.qualities.map((qualitie) => userQualitiesCol(qualitie))}</td>
        <td>{user.profession.name}</td>
        <td>{user.completedMeetings}</td>
        <td>{user.rate}</td>
        <td>
          <button
            onClick={() => handleDelete(user._id)}
            className="btn btn-danger btn-sm"
          >
            Удалить
          </button>
        </td>
      </tr>
    );
  };

  const userQualitiesCol = (qualitie) => {
    return (
      <span key={qualitie._id} className={getBageclasses(qualitie.color)}>
        {qualitie.name}
      </span>
    );
  };

  const getBageclasses = (color) => {
    let classes = `badge m-2 bg-${color}`;
    return classes;
  };

  return (
    <React.Fragment>
      {renderPhrase(users.length)}
      <table className="table" id="table">
        <thead>
          <tr>
            <th scope="col">Имя</th>
            <th scope="col">Качества</th>
            <th scope="col">Профессия</th>
            <th scope="col">Встретился,раз</th>
            <th scope="col">Оценка</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>{users.map((user) => userRow(user))}</tbody>
      </table>
    </React.Fragment>
  );
};

export default Users;
