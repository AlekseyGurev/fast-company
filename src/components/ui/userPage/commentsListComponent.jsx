import React, { useState, useEffect } from "react";
import CommentComponents from "../userPage/commentComponents";
import PropTypes from "prop-types";
import api from "../../../API";
import _ from "lodash";
import AddCommentForm from "../../common/form/addCommentForm";

const CommentsListComponent = ({ userId }) => {
    const [commentsUser, setCommentsUser] = useState();
    const [commentsTextAdd, setCommentsTextAdd] = useState();
    const [commentsUserAdd, setCommentsUserAdd] = useState("");
    const [usersForSelect, setUsersForSelect] = useState();
    const updateComments = () => {
        api.comments.fetchCommentsForUser(userId).then((userData) => {
            setCommentsUser(_.sortBy(userData, "created_at").reverse());
        });
    };
    useEffect(() => {
        api.users.fetchAll().then((userData) => {
            setUsersForSelect(userData.map((data) => ({
                name: data.name,
                value: data._id
            })));
        });
    }, []);
    useEffect(() => {
        updateComments();
    }, []);
    const handleDeletComment = (commentId) => {
        api.comments.remove(commentId);
        api.comments.fetchCommentsForUser(userId).then((userData) => {
            setCommentsUser(_.sortBy(userData, "created_at"));
        });
    };
    const handleChangeUserComment = ({ target }) => {
        setCommentsUserAdd(target.value);
    };
    const handleChangeTextCooment = ({ target }) => {
        setCommentsTextAdd(target.value);
    };
    const submitComment = (e) => {
        e.preventDefault();
        const data = {
            content: commentsTextAdd,
            pageId: userId,
            userId: commentsUserAdd
        };
        api.comments.add(data);
        updateComments();
        setCommentsTextAdd("");
        setCommentsUserAdd("");
    };
    console.log("reboot");
    return (<>
        <div className="card mb-2">
            <AddCommentForm
                usersForSelect={usersForSelect}
                submitComment={submitComment}
                handleChangeUserComment={handleChangeUserComment}
                handleChangeTextCooment={handleChangeTextCooment}
                commentsTextAdd={commentsTextAdd}
                commentsUserAdd={commentsUserAdd}
            />
        </div><div className="card mb-3">
            <div className="card-body ">
                <h2>Comments</h2>
                <hr />
                {commentsUser && commentsUser.map(comment => (
                    <CommentComponents
                        key={comment._id}
                        commentId={comment._id}
                        userId={comment.userId}
                        time={comment.created_at}
                        content={comment.content}
                        deletComment={handleDeletComment}/>))}
            </div>
        </div></>);
};

CommentsListComponent.propTypes = {
    userId: PropTypes.string,
    deletComment: PropTypes.func
};

export default CommentsListComponent;
