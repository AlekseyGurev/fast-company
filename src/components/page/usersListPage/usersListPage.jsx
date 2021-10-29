import React, { useState, useEffect } from "react";
import Pagination from "../../common/pagination";
import { paginate } from "../../../utils/paginate";
import GroupList from "../../common/groupList";
import api from "../../../API";
import SearchStatus from "../../ui/searchStatus";
import _ from "lodash";
import UsersTable from "../../ui/usersTable";
import SearchUsers from "../../searchUsers";
import { searchUserText } from "../../../utils/searchUserText";

const UsersListPage = () => {
    const pageSize = 6;
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfession] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });
    const [users, setUsers] = useState();
    const [searchUser, setSearchUser] = useState("");
    useEffect(() => {
        api.users.fetchAll().then((data) => {
            setUsers(data);
        }, []);
    });

    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId));
    };

    const handleBookMark = (userId) => {
        setUsers(
            users.map((user) => {
                if (user._id === userId) {
                    user.bookmark = !user.bookmark;
                }
                return user;
            })
        );
    };
    useEffect(() => {
        api.professions.fetchAll().then((data) => {
            setProfession(data);
        });
    }, []);
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    const handlePageCahge = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const handleProfessionSelect = (item) => {
        setSearchUser("");
        setSelectedProf(item);
    };

    const handleSort = (item) => {
        setSortBy(item);
    };

    if (users) {
        const filteredUsers = searchUser !== ""
            ? users.filter((user) => searchUserText(user.name, searchUser))
            : (selectedProf ? users.filter((user) => _.isEqual(user.profession, selectedProf)) : users);

        const count = filteredUsers.length;
        const handleSearch = ({ target }) => {
            clearFilter();
            setSearchUser(target.value);
            console.log(users.filter((user) => searchUserText(user.name, searchUser)));
        };
        const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
        const usersCrop = paginate(sortedUsers, currentPage, pageSize);
        const clearFilter = () => {
            setSelectedProf();
            setSearchUser("");
        };
        return (
            <div className="d-flex">
                {professions && (
                    <div className="d-flex flex-column flex-shrink-0 p-3">
                        <GroupList
                            items={professions}
                            selectedItem = {selectedProf}
                            onItemSelect={handleProfessionSelect}
                        />
                        <button className="btn btn-secondary mt-2"
                            onClick={clearFilter}
                        >{" "}Очистить</button>
                    </div>
                )}
                <div className="d-flex flex-column">
                    <SearchStatus length={count} />
                    <SearchUsers value={searchUser} handleSearch={handleSearch}/>
                    <UsersTable
                        users={usersCrop}
                        count={count}
                        onSort = {handleSort}
                        selectedSort = {sortBy}
                        onDelete = {handleDelete}
                        onBookMark = {handleBookMark}
                    />
                    <div className="d-flex justify-content-center">
                        <Pagination
                            itemsCount={count}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={handlePageCahge}
                        />
                    </div>
                </div>
            </div>

        );
    }
    return <div className="container">
        <h1>loading...</h1>
    </div>;
};

export default UsersListPage;
