import React, { useState, useEffect } from "react";
import PropTypes, { oneOfType } from "prop-types";
import { getDate } from "../../../utils/getDate";
import api from "../../../API";

const CommentComponents = ({ userId, time, content, deletComment, commentId }) => {
    const [user, setUser] = useState([]);
    useEffect(() => {
        api.users.getById(userId).then((userData) => {
            setUser(userData);
        });
    }, []);
    return (<>{
        user.name
            ? (<div className="bg-light card-body  mb-3">
                <div className="row">
                    <div className="col">
                        <div className="d-flex flex-start ">
                            <img
                                src={`https://avatars.dicebear.com/api/avataaars/${(
                                    Math.random() + 1
                                )
                                    .toString(36)
                                    .substring(7)}.svg`}
                                className="rounded-circle shadow-1-strong me-3"
                                alt="avatar"
                                width="65"
                                height="65"
                            />
                            <div className="flex-grow-1 flex-shrink-1">
                                <div className="mb-4">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <p className="mb-1 ">
                                            {user.name}
                                            <span className="small">
                                                {getDate(time)}
                                            </span>
                                        </p>
                                        <button className="btn btn-sm text-primary d-flex align-items-center" >
                                            <i onClick={() => deletComment(commentId)} className="bi bi-x-lg"></i>
                                        </button>
                                    </div>
                                    <p className="small mb-0">{content}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>)
            : ""
    }</>
    );
};

CommentComponents.propTypes = {
    userId: PropTypes.string,
    time: oneOfType([PropTypes.string, PropTypes.number]),
    content: PropTypes.string,
    deletComment: PropTypes.func,
    commentId: PropTypes.string
};

export default CommentComponents;
