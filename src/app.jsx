import React, { useState, useEffect } from "react";
import Users from "./components/users";
import api from "./API";

const App = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        api.users.fetchAll().then((data) => {
            setUsers(data);
        }, []);
    });

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
            <Users
                users={users}
                onDelete={handleDelete}
                onBookMark={handleBookMark}
            />
        </div>
    );
};

export default App;
