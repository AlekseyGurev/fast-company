import React, { useState, useEffect } from "react";
import SelectedFieldsUserComment from "./selectedFieldsUserComment";
import TextArea from "./textArea";
import PropTypes from "prop-types";
import api from "../../../API";

const AddCommentForm = ({ userId, updateComments }) => {
    const [commentsTextAdd, setCommentsTextAdd] = useState();
    const [commentsUserAdd, setCommentsUserAdd] = useState("");
    const [usersForSelect, setUsersForSelect] = useState();

    useEffect(() => {
        api.users.fetchAll().then((userData) => {
            setUsersForSelect(userData.map((data) => ({
                name: data.name,
                value: data._id
            })));
        });
    }, []);

    const submitComment = (e) => {
        e.preventDefault();
        const data = {
            content: commentsTextAdd,
            pageId: userId,
            userId: commentsUserAdd
        };
        api.comments.add(data);
        updateComments();
        setCommentsTextAdd(" ");
        setCommentsUserAdd("");
    };
    const handleChangeUserComment = ({ target }) => {
        setCommentsUserAdd(target.value);
    };
    const handleChangeTextCooment = ({ target }) => {
        setCommentsTextAdd(target.value);
    };
    return (<div className="card-body ">
        <h2>New comments</h2>
        <hr />
        <form className="container d-flex flex-column">

            <SelectedFieldsUserComment
                options={usersForSelect}
                onChange={handleChangeUserComment}
                label = "Выберете пользователя"
                defaultOption="Choose..."
                value={commentsUserAdd}
            />
            <TextArea
                name={"Сообщение"}
                rows={"3"}
                onChange={handleChangeTextCooment}
                value={commentsTextAdd}
            />
            <div className="d-flex justify-content-end">
                <button onClick={submitComment}
                    className="btn btn-primary"
                >
                      Сохранить
                </button>
            </div>
        </form>
    </div>);
};

AddCommentForm.propTypes = {
    userId: PropTypes.string,
    updateComments: PropTypes.func
};

export default AddCommentForm;
