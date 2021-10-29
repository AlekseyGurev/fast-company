import React, { useState, useEffect } from "react";
import CommentComponents from "../userPage/commentComponents";
import PropTypes from "prop-types";
import api from "../../../API";
import _ from "lodash";
import AddCommentForm from "../../common/form/addCommentForm";

const CommentsListComponent = ({ userId }) => {
    const [commentsUser, setCommentsUser] = useState();
    const updateComments = () => {
        api.comments.fetchCommentsForUser(userId).then((userData) => {
            setCommentsUser(_.sortBy(userData, "created_at").reverse());
        });
    };
    useEffect(() => {
        updateComments();
    }, []);

    const handleDeletComment = (commentId) => {
        api.comments.remove(commentId);
        api.comments.fetchCommentsForUser(userId).then((userData) => {
            setCommentsUser(_.sortBy(userData, "created_at"));
        });
    };
    return (<>
        <div className="card mb-2">
            <AddCommentForm
                userId = {userId}
                updateComments={updateComments}
            />
        </div><div className="card mb-3">
            <div className="card-body ">
                <h2>Comments</h2>
                <hr />
                {commentsUser && commentsUser.map(comment => (
                    <CommentComponents
                        key={comment._id}
                        commentId={comment._id}
                        time={comment.created_at}
                        content={comment.content}
                        userId={comment.userId}
                        deletComment={handleDeletComment}/>))}
            </div>
        </div></>);
};

CommentsListComponent.propTypes = {
    userId: PropTypes.string,
    deletComment: PropTypes.func
};

export default CommentsListComponent;
