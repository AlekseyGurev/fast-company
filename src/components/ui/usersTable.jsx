import React from "react";
import PropTypes from "prop-types";

import BookMark from "../common/bookmark";
import Qualities from "../ui/qualities";
import Table, { TableHeader, TableBody } from "../common/table";
import Profession from "./profession";

const UsersTable = ({ count, users, onSort, selectedSort, onBookMark, ...rest }) => {
    const columns = {
        name: { path: "name", name: "Имя" },
        qualities: { name: "Качества", component: (user) => (<Qualities qualities={ user.qualities }/>) },
        profession: { name: "Профессия", component: (user) => <Profession id={user.profession}/> },
        completedMeetings: { path: "completedMeetings", name: "Встретился,раз" },
        rate: { path: "rate", name: "Оценка" },
        bookMark: { path: "bookMark", name: "Избранное", component: (user) => (<BookMark status={user.bookmark} onClick={() => onBookMark(user._id)} />) }
    };
    return (
        <Table onSort={onSort} selectedSort={selectedSort} columns = {columns} data = {users} count={count}>
            <TableHeader {...{ onSort, selectedSort, columns }} />
            <TableBody {... { columns, data: users }} />
        </Table>
    );
};

UsersTable.propTypes = {
    users: PropTypes.array.isRequired,
    count: PropTypes.number.isRequired,
    selectedSort: PropTypes.object.isRequired,
    onSort: PropTypes.func.isRequired,
    onBookMark: PropTypes.func.isRequired,
    _id: PropTypes.func
};

export default UsersTable;
