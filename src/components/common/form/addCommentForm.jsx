import React from "react";
import SelectedFieldsUserComment from "./selectedFieldsUserComment";
import TextArea from "./textArea";
import PropTypes from "prop-types";

const AddCommentForm = ({ submitComment, handleChangeUserComment, handleChangeTextCooment, usersForSelect, commentsUserAdd, commentsTextAdd }) => {
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
    submitComment: PropTypes.func,
    handleChangeUserComment: PropTypes.func,
    handleChangeTextCooment: PropTypes.func,
    usersForSelect: PropTypes.array,
    commentsUserAdd: PropTypes.string,
    commentsTextAdd: PropTypes.string
};

export default AddCommentForm;
