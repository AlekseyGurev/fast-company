import React from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { useUser } from "../../../hooks/useUsers";
import EditForm from "../../ui/editFrom";
import UserCard from "../../ui/userPage/userCard";
import QualitiesCard from "../../ui/userPage/qualitiesCard";
import MeetingsCard from "../../ui/userPage/meetingsCard";
import { CommentsProvider } from "../../../hooks/useComments";
import Comments from "../../ui/comments";

const User = ({ userId }) => {
    const { getUserById } = useUser();
    const user = getUserById(userId);
    const params = useParams();
    const { edit } = params;
    const userRender = (user) => {
        return (
            <>
                {edit === "edit"
                    ? (
                        <EditForm userId={userId} />
                    )
                    : (
                        <div className="container">
                            <div className="row gutters-sm">
                                <div className="col-md-4 mb-3">
                                    <UserCard
                                        name={user.name}
                                        rate={user.rate}
                                        profession={user.profession.name}
                                        userId={userId}
                                    />
                                    <QualitiesCard qualities={user.qualities} />
                                    <MeetingsCard meetings={user.completedMeetings} />
                                </div>
                                <div className="col-md-8">
                                    <CommentsProvider>
                                        <Comments />
                                    </CommentsProvider>
                                </div>
                            </div>{" "}
                        </div>
                    )}
            </>
        );
    };
    return (
        <>
            {user
                ? (
                    userRender(user)
                )
                : (
                    <div className="container">
                        <h1>loading...</h1>
                    </div>
                )}
        </>
    );
};

User.propTypes = {
    userId: PropTypes.string
};
export default User;
