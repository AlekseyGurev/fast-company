import React, { useState } from "react";
import { useEffect } from "react/cjs/react.development";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import SelectedField from "../common/form/selectedField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import CheckBoxField from "../common/form/checkBoxField";
import { useQualities } from "../../hooks/useQualities";
import { useProfession } from "../../hooks/useProfession";
import { useAuth } from "../../hooks/useAuth";
import { useHistory } from "react-router-dom";

const RegisterForm = () => {
    const history = useHistory();
    const [data, setData] = useState({ email: "", password: "", profession: "", name: "", sex: "male", qualities: [], licence: false });
    const { singUp } = useAuth();
    const [errors, setErrors] = useState({});
    const { qualities } = useQualities();
    const qualitiesList = qualities.map(q => ({ label: q.name, value: q._id }));
    const { professions } = useProfession();
    const professionsList = professions.map(p => ({ label: p.name, value: p._id }));
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
        name: {
            isRequired: {
                message: "Имя должно быть заполнено"
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

    const handleSubmit = async(e) => {
        e.preventDefault();
        const isValidate = validate();
        if (!isValidate) return;
        const newData = { ...data, qualities: data.qualities.map((q) => q.value) };
        try {
            await singUp(newData);
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
                label = "Name"
                name="name"
                value={data.name}
                onChange={handleChange}
                error = {errors.name}
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
                options={professionsList}
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
                options={qualitiesList}
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
