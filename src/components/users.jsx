import React, { useState } from "react";
import User from "./user";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import PropTypes from "prop-types";

const Users = ({ users: allUsers, ...rest }) => {
    let tableClasses = "table";
    const count = allUsers.length;
    const pageSize = 4;
    const [currentPage, setCurrentPage] = useState(1);
    const handlePageCahge = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    if (count === 0) {
        tableClasses += " d-none";
    }
    const users = paginate(allUsers, currentPage, pageSize);
    return (
        <>
            <table className={tableClasses} id="table">
                <thead>
                    <tr>
                        <th scope="col">Имя</th>
                        <th scope="col">Качества</th>
                        <th scope="col">Профессия</th>
                        <th scope="col">Встретился,раз</th>
                        <th scope="col">Оценка</th>
                        <th scope="col">Избранное</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <User key={user._id} {...rest} {...user} />
                    ))}
                </tbody>
            </table>
            <Pagination
                itemsCount={count}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={handlePageCahge}
            />
        </>
    );
};
Users.propTypes = {
    users: PropTypes.array.isRequired
};

export default Users;
