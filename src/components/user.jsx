import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../API";
import QualitiesList from "./qualitiesList";
import { useHistory } from "react-router-dom";

const User = ({ userId }) => {
    const [user, setUser] = useState();
    const history = useHistory();
    useEffect(() => {
        api.users.getById(userId).then((userData) => {
            setUser(userData);
        }, []);
    });
    const goToAllUsers = () => {
        history.push("/users");
    };
    const userRender = (user) => {
        return (
            <div className="container">
                <ul className="list-unstyled" >
                    <li>
                        <h1>{user.name}</h1>
                    </li>
                    <li>
                        <h3>Профессия: {user.profession.name}</h3>
                    </li>
                    <li>
                        <QualitiesList qualities={user.qualities}/>
                    </li>
                    <li>
                        <p>completedMeetings:{user.completedMeetings}</p>
                    </li>
                    <li>
                        <h1>Rate:{user.rate}</h1>
                    </li>
                </ul>
                <button
                    onClick={() => {
                        goToAllUsers();
                    }}
                    type="button" className="btn btn-success">Все пользователи</button>
            </div>
        );
    };
    return (<>
        { user ? (userRender(user)) : (<h1>loading</h1>)}
    </>
    );
};

User.propTypes = {
    userId: PropTypes.string
};
export default User;
