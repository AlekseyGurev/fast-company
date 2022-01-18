import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import SelectField from "../common/form/selectedField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import BackHistoryButton from "../common/backButton";
import { useAuth } from "../../hooks/useAuth";
import { useQualities } from "../../hooks/useQualities";
import { useProfession } from "../../hooks/useProfession";
import userService from "../../services/user.service";

const EditForm = () => {
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState();
    const { currentUser } = useAuth();
    const { professions, isLoading: professionLoading } = useProfession();
    const { qualities, isLoading: qualitiesLoading, getQualityId } = useQualities();
    const qualitiesList = qualities.map(q => ({ label: q.name, value: q._id }));
    const professionsList = professions.map(p => ({ label: p.name, value: p._id }));
    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        userService.updateUser({
            ...data,
            profession: data.profession,
            qualities: transformQualities(data.qualities)
        });
        history.push(`/users/${currentUser._id}`);
    };
    const transformQualities = (q) => {
        return q.map((qual) => (qual.value));
    };

    const transformData = (q) => {
        return q.map((qual) => ({ label: getQualityId(qual).name, value: qual }));
    };

    useEffect(() => {
        if (!professionLoading && !qualitiesLoading && currentUser && !data) {
            setData({
                ...currentUser,
                qualities: transformData(currentUser.qualities)
            });
        }
    }, [professionLoading, qualitiesLoading, currentUser, data]);

    const validatorConfog = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        },

        name: {
            isRequired: {
                message: "Введите ваше имя"
            }
        }
    };
    useEffect(() => validate(), [data]);
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    useEffect(() => {
        if (data && isLoading) {
            setIsLoading(false);
        }
    }, [data]);
    const validate = () => {
        const errors = validator(data, validatorConfog);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;
    return (
        <div className="container mt-5">
            <BackHistoryButton />
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    {!isLoading
                        ? (
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    label="Имя"
                                    name="name"
                                    value={data.name}
                                    onChange={handleChange}
                                    error={errors.name}
                                />
                                <TextField
                                    label="Электронная почта"
                                    name="email"
                                    value={data.email}
                                    onChange={handleChange}
                                    error={errors.email}
                                />
                                <SelectField
                                    label="Выбери свою профессию"
                                    defaultOption="Choose..."
                                    name="profession"
                                    options={professionsList}
                                    onChange={handleChange}
                                    value={data.profession}
                                    error={errors.profession}
                                />
                                <RadioField
                                    options={[
                                        { name: "Male", value: "male" },
                                        { name: "Female", value: "female" },
                                        { name: "Other", value: "other" }
                                    ]}
                                    value={data.sex}
                                    name="sex"
                                    onChange={handleChange}
                                    label="Выберите ваш пол"
                                />
                                <MultiSelectField
                                    defaultValue={data.qualities}
                                    options={qualitiesList}
                                    onChange={handleChange}
                                    values
                                    name="qualities"
                                    label="Выберите ваши качесвта"
                                />
                                <button
                                    type="submit"
                                    disabled={!isValid}
                                    className="btn btn-primary w-100 mx-auto"
                                >
                                Обновить
                                </button>
                            </form>
                        )
                        : (
                            "Loading..."
                        )}
                </div>
            </div>
        </div>
    );
};
export default EditForm;
