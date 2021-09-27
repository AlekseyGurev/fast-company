import React from "react";
import PropTypes from "prop-types";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
import BookMark from "./bookmark";
import QualitiesList from "./qualitiesList";
import Table from "./table";

const UsersTable = ({ count, users, onSort, selectedSort, onBookMark, onDelete, ...rest }) => {
    const columns = {
        name: { path: "name", name: "Имя" },
        qualities: { name: "Качества", component: (user) => (<QualitiesList qualities={ user.qualities }/>) },
        profession: { path: "profession.name", name: "Профессия" },
        completedMeetings: { path: "completedMeetings", name: "Встретился,раз" },
        rate: { path: "rate", name: "Оценка" },
        bookMark: { path: "bookMark", name: "Избранное", component: (user) => (<BookMark status={user.bookmark} onClick={() => onBookMark(user._id)} />) },
        delete: {
            component: (user) => (<button onClick={() => onDelete(user._id)} className="btn btn-danger btn-sm">
            Удалить
            </button>)

        }
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
    _id: PropTypes.func,
    onDelete: PropTypes.func.isRequired
};

export default UsersTable;
