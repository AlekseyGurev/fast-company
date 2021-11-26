import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import userService from "../services/user.service";
import { toast } from "react-toastify";
import { setTokens } from "../services/localStorage.service";

const httpAuth = axios.create({
    baseURL: "https://identitytoolkit.googleapis.com/v1/",
    params: {
        key: process.env.REACT_APP_FIREBASE_KEY
    }
});
const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
    const [currentUser, setUser] = useState({});
    const [errors, setErrors] = useState(null);

    async function singUp({ email, password, ...rest }) {
        try {
            const { data } = await httpAuth.post(`accounts:signUp`, { email, password, returnSecureToken: true });
            setTokens(data);
            await createUser({ _id: data.localId, email, ...rest });
        } catch (error) {
            errorCatch(error);
            const { code, message } = error.response.data.error;
            if (code === 400) {
                if (message === "EMAIL_EXISTS") {
                    const errorObject = { email: "Пользователь с таким Emai уже существует" };
                    throw errorObject;
                }
            }
        }
    };

    async function signIn({ email, password }) {
        try {
            const { data } = await httpAuth.post(`accounts:signInWithPassword`, { email, password, returnSecureToken: true });
            setTokens(data);
        } catch (error) {
            const { code, message } = error.response.data.error;
            if (code === 400) {
                switch (message) {
                case "INVALID_PASSWORD":
                    throw new Error("Email пользователя или пароль введены не правильно");
                default:
                    throw new Error("Слишком много попыток входа. Попробуйте позже");
                }
            }
        }
    }
    async function createUser(data) {
        try {
            const { content } = userService.create(data);
            setUser(content);
        } catch (error) {
            errorCatch(error);
        }
    }
    function errorCatch(error) {
        const { message } = error.response.data;
        setErrors(message);
    }
    useEffect(() => {
        if (errors !== null) {
            toast.error(errors);
            setErrors(null);
        }
    }, [errors]);
    return (
        <AuthContext.Provider value={{ singUp, signIn, currentUser }} >
            { children }
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

export default AuthProvider;
