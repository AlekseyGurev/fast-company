import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../../../API";
import Qualities from "../../ui/qualities";
import { useHistory, useParams } from "react-router-dom";
import EditForm from "../../ui/editFrom";

const User = ({ userId }) => {
    const [user, setUser] = useState();
    const history = useHistory();
    const params = useParams();
    const { edit } = params;
    useEffect(() => {
        api.users.getById(userId).then((userData) => {
            setUser(userData);
        }, []);
    });
    const goToEdit = () => {
        history.push(`${userId}/edit`);
    };
    const userRender = (user) => {
        return <>
            { edit === "edit"
                ? <EditForm userId = {userId}/>
                : <div className="container">
                    <ul className="list-unstyled" >
                        <li>
                            <h1>{user.name}</h1>
                        </li>
                        <li>
                            <h3>Профессия: {user.profession.name}</h3>
                        </li>
                        <li>
                            <Qualities qualities={user.qualities}/>
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
                            goToEdit();
                        }}
                        type="button" className="btn btn-success">Изменить</button>
                </div>}
        </>;
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
