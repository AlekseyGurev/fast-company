import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import userService from "../services/user.service";
import { toast } from "react-toastify";
import localStorageService, { setTokens } from "../services/localStorage.service";
import { useHistory } from "react-router-dom";

export const httpAuth = axios.create({
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
    const [currentUser, setUser] = useState();
    const [errors, setErrors] = useState(null);
    const [isLoading, setloading] = useState(true);
    const history = useHistory();
    function randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    async function singUp({ email, password, ...rest }) {
        try {
            const { data } = await httpAuth.post(`accounts:signUp`, { email, password, returnSecureToken: true });
            setTokens(data);
            await createUser({
                _id: data.localId,
                email,
                rate: randomInt(1, 5),
                completedMeetings: randomInt(0, 200),
                image: `https://avatars.dicebear.com/api/avataaars/${(
                    Math.random() + 1
                )
                    .toString(36)
                    .substring(7)}.svg`,
                ...rest
            });
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
            await getUserData();
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

    function logOut() {
        localStorageService.removeAuthData();
        setUser(null);
        history.push("/");
    };
    async function createUser(data) {
        try {
            const { content } = await userService.create(data);
            setUser(content);
        } catch (error) {
            errorCatch(error);
        }
    }
    function errorCatch(error) {
        const { message } = error.response.data;
        setErrors(message);
    }
    async function getUserData() {
        try {
            const { content } = await userService.getCurrentUser();
            setUser(content);
        } catch (error) {
            errorCatch(error);
        } finally {
            setloading(false);
        }
    }
    useEffect(() => {
        if (localStorageService.getAccessToken()) {
            getUserData();
        } else {
            setloading(false);
        }
    }, []);
    useEffect(() => {
        if (errors !== null) {
            toast.error(errors);
            setErrors(null);
        }
    }, [errors]);
    return (
        <AuthContext.Provider value={{ singUp, signIn, currentUser, logOut }} >
            {!isLoading ? children : "Loading..." }
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

export default AuthProvider;
