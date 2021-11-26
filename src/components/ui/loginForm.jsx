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
    const history = useHistory();
    const { signIn } = useAuth();
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const validatorConfig = {
        email: {
            isRequired: {
                message: "Эдектронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Эдектронная почта введена не корректно"
            }
        },
        password: {
            isRequired: {
                message: "Пароль обязателен для заполнения"
            },
            isCapitalSymbol: {
                message: "Пароль должен содержать заглавную букву"
            },
            isContainDigit: {
                message: "Пароль должен содержать цифру"
            },
            min: {
                value: 8,
                message: "Пароль должен быть больше 7 символов"
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
            history.push("/");
        } catch (error) {
            setErrors(error);
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
            <button disabled={!isValid}
                className="btn btn-primary w-100 mx-auto"
            >
                            Submit
            </button>
        </form>
    );
};

export default Login;
