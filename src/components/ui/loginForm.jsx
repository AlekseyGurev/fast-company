import React, { useState } from "react";
import { useEffect } from "react/cjs/react.development";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import CheckBoxField from "../common/form/checkBoxField";
import { useAuth } from "../../hooks/useAuth";
import { useHistory } from "react-router";

const Login = () => {
    const [data, setData] = useState({ email: "", password: "", stayOn: false });
    const [errors, setErrors] = useState({});
    const [enterError, setEnterError] = useState(null);
    const history = useHistory();
    const { signIn } = useAuth();
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
        setEnterError(null);
    };
    const validatorConfig = {
        email: {
            isRequired: {
                message: "Эдектронная почта обязательна для заполнения"
            }
        },
        password: {
            isRequired: {
                message: "Пароль обязателен для заполнения"
            }
        }
    };
    useEffect(() => {
        validate();
    }, [data]);
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;
    const handleSubmit = async(e) => {
        e.preventDefault();
        const isValidate = validate();
        if (!isValidate) return;
        try {
            await signIn(data);
            console.log(history.location.state.from.pathname);
            history.push(history.location.state.from.pathname ? history.location.state.from.pathname : "/");
        } catch (error) {
            setEnterError(error.message);
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label = "Email"
                name="email"
                value={data.email}
                onChange={handleChange}
                error = {errors.email}
            />
            <TextField
                label = "Password"
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                error = {errors.password}
            />
            <CheckBoxField
                onChange={handleChange}
                value={data.stayOn}
                name="stayOn"
            >
                    Отстаться в системе
            </CheckBoxField>
            {enterError && <p className="text-danger">{enterError}</p>}
            <button disabled={!isValid || enterError}
                className="btn btn-primary w-100 mx-auto"
            >
                            Submit
            </button>
        </form>
    );
};

export default Login;
