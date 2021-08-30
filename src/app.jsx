import React, { useState } from "react";
import Users from "./components/users";
import SearchStatus from "./components/searchStatus";
import api from "./API";

const App = () => {
  const initialState = api.users.fetchAll();

  const [users, setUsers] = useState(
    initialState.map((user) => {
      user.status = false;
      return user;
    })
  );

  const handleDelete = (userId) => {
    setUsers(users.filter((user) => user._id !== userId));
  };

  const handleBookMark = (userId) => {
    setUsers(
      users.map((user) => {
        if (user.id === userId) {
          user.status = true;
        }
        return user;
      })
    );
  };

  return (
    <div>
      <SearchStatus length={users.length} />
      <Users
        users={users}
        onDelete={handleDelete}
        onBookMark={handleBookMark}
      />
    </div>
  );
};

export default App;
