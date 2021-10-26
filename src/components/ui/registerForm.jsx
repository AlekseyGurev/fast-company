import React, { useState } from "react";
import { useEffect } from "react/cjs/react.development";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import api from "../../API";
import SelectedField from "../common/form/selectedField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import CheckBoxField from "../common/form/checkBoxField";

const RegisterForm = () => {
    const [professions, setProfession] = useState();
    const [data, setData] = useState({ email: "", password: "", profession: "", sex: "male", qualities: [], licence: false });
    const [qualities, setQualities] = useState({});
    const [errors, setErrors] = useState({});
    useEffect(() => {
        api.professions.fetchAll().then((data) => {
            setProfession(data);
        });
        api.qualities.fetchAll().then((qualities) => {
            setQualities(qualities);
        });
    }, []);
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
        },
        profession: {
            isRequired: {
                message: "Профессия обязательно должна быть выбрана"
            }
        },
        licence: {
            isRequired: {
                message: "Лицензия должна быть подтверждена"
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
            <SelectedField
                options={professions}
                defaultOption="Choose..."
                label = "Выберете вашу профессию"
                value={data.profession}
                onChange={handleChange}
                error = {errors.profession}
            />
            <RadioField
                options={[
                    { name: "Male", value: "male" },
                    { name: "Female", value: "female" },
                    { name: "Other", value: "other" }
                ]}
                name="sex"
                value={data.sex}
                onChange={handleChange}
                label="Выберете пол:"
            />
            <MultiSelectField
                onChange={handleChange}
                options={qualities}
                name="qualities"
                label="Выберете качества:"
            />
            <CheckBoxField
                onChange={handleChange}
                value={data.licence}
                name="licence"
                error = {errors.licence}
            >
                    Подтвердить <a> лицензионно соглашение </a>
            </CheckBoxField>
            <button disabled={!isValid}
                className="btn btn-primary w-100 mx-auto"
            >
                          Submit
            </button>
        </form>
    );
};

export default RegisterForm;
