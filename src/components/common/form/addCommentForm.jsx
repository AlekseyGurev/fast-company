import React, { useState } from "react";
import TextArea from "./textArea";
import PropTypes from "prop-types";
const initialData = { userId: " ", content: " " };

const AddCommentForm = ({ onSubmit }) => {
    const [data, setData] = useState(initialData);

    const handleChangeTextCooment = ({ target }) => {
        setData((prevState) => ({
            ...prevState, [target.name]: target.value
        }));
    };

    const hundleSubmit = (e) => {
        e.preventDefault();
        onSubmit(data);
    };
    return (<div className="card-body ">
        <h2>New comments</h2>
        <hr />
        <form className="container d-flex flex-column">

            <TextArea
                name="content"
                rows={"3"}
                onChange={handleChangeTextCooment}
                value={data.content}
                label="Сообщение"
            />
            <div className="d-flex justify-content-end">
                <button onClick={hundleSubmit}
                    className="btn btn-primary"
                >
                      Сохранить
                </button>
            </div>
        </form>
    </div>);
};

AddCommentForm.propTypes = {
    onSubmit: PropTypes.func,
    updateComments: PropTypes.func
};

export default AddCommentForm;
