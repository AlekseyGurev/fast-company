import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../../API";
import TextField from "../common/form/textField";
import SelectedField from "../common/form/selectedField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import { validator } from "../../utils/validator";
import { useHistory } from "react-router-dom";

const EditForm = ({ userId }) => {
    const [user, setUser] = useState({ name: "", email: "", profession: "", sex: "", qualities: [] });
    const [professions, setProfession] = useState();
    const history = useHistory();
    const [errors, setErrors] = useState({});
    const [qualitiesAll, setQualitiesAll] = useState({});
    useEffect(() => {
        api.users.getById(userId).then((userData) => {
            setUser({
                name: userData.name,
                email: userData.email,
                profession: userData.profession._id,
                sex: userData.sex,
                qualities: userData.qualities.map(quality => ({
                    label: quality.name,
                    value: quality._id
                }))
            });
        });
        api.professions.fetchAll().then((data) => {
            setProfession(data);
        });
        api.qualities.fetchAll().then((qualities) => {
            setQualitiesAll(qualities);
        });
    }, []);
    const handleChange = (target) => {
        setUser((prevState) => ({
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
        }
    };
    useEffect(() => {
        validate();
    }, [user]);
    const validate = () => {
        const errors = validator(user, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const qualitiesEdit = () => {
        const newArrayQualities = [];
        user.qualities.forEach((quality) => {
            Object.keys(qualitiesAll).forEach((qualityAll) => {
                if (qualitiesAll[qualityAll]._id === quality.value) {
                    newArrayQualities.push(qualitiesAll[qualityAll]);
                };
            });
        });
        return newArrayQualities;
    };
    const goToUser = () => {
        history.push(`/users/${userId}`);
    };
    const isValid = Object.keys(errors).length === 0;
    const handleSubmit = (e) => {
        e.preventDefault();
        const isValidate = validate();
        if (!isValidate) return;
        const data = {
            name: user.name,
            email: user.email,
            profession: professions[Object.keys(professions).filter(profession => professions[profession]._id === user.profession)],
            sex: user.sex,
            qualities: qualitiesEdit()
        };
        api.users.update(userId, data);
        goToUser();
    };
    return (<>
        { Object.keys(qualitiesAll).length > 0
            ? (<div className="d-flex flex-row offset-md-2">
                <div>
                    <button
                        onClick={history.goBack}
                        type="button" className="btn btn-success m-4">
                Назад
                    </button>
                </div>
                <div className="col-md-6 shadow p-4">
                    <div className="container">
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Имя"
                                name="name"
                                value={user.name}
                                onChange={handleChange} />
                            <TextField
                                label="Email"
                                name="email"
                                value={user.email}
                                onChange={handleChange}
                                error={errors.email} />
                            <SelectedField
                                options={professions}
                                defaultOption="Choose..."
                                label="Выберете вашу профессию"
                                value={user.profession.name}
                                onChange={handleChange} />
                            <RadioField
                                options={[
                                    { name: "Male", value: "male" },
                                    { name: "Female", value: "female" },
                                    { name: "Other", value: "other" }
                                ]}
                                name="sex"
                                value={user.sex}
                                onChange={handleChange}
                                label="Выберете пол:" />
                            <MultiSelectField
                                onChange={handleChange}
                                options={qualitiesAll}
                                name="qualities"
                                label="Выберете качества:"
                                value={user.qualities} />
                            <button disabled={!isValid}
                                className="btn btn-primary "
                            >
                                Сохранить
                            </button>
                        </form>
                    </div>
                </div></div>)
            : (<div className="container"> <h1>loading...</h1></div>)}
    </>);
};
EditForm.propTypes = {
    userId: PropTypes.string
};

export default EditForm;
