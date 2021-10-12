import React, { useState } from "react";
import { useEffect } from "react/cjs/react.development";
import TextField from "../components/textField";
import { validator } from "../utils/validator";

const Login = () => {
    const [data, setData] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});
    const handleChange = ({ target }) => {
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
    const handleSubmit = (e) => {
        e.preventDefault();
        const isValidate = validate();
        if (!isValidate) return;
        console.log(data);
    };
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    <h3 className="mb-4">Login</h3>
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
                        <button disabled={!isValid}
                            className="btn btn-primary w-100 mx-auto"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
