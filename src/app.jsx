import React, { useState } from "react";
import Users from "./components/users";
import SearchStatus from "./components/searchStatus";
import api from "./API";

const App = () => {
    const [users, setUsers] = useState(api.users.fetchAll());

    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId));
    };

    const handleBookMark = (userId) => {
        setUsers(
            users.map((user) => {
                if (user._id === userId) {
                    user.status = !user.status;
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
