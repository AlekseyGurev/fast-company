import React from "react";
import { useEffect } from "react/cjs/react.development";
import { useAuth } from "../hooks/useAuth";

const LogOut = () => {
    const { logOut } = useAuth();
    useEffect(() => {
        logOut();
    }, []);
    return (<h1>Loading...</h1>);
};

export default LogOut;
