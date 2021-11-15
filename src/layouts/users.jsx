import React from "react";
import { useParams } from "react-router-dom";
import User from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage";
import UserProvider from "../hooks/useUsers";

const Users = () => {
    const params = useParams();
    const { userId } = params;
    return <>
        <UserProvider>
            {userId
                ? (<User userId={userId}/>)
                : (<UsersListPage />)}
        </UserProvider>
    </>;
};

export default Users;
