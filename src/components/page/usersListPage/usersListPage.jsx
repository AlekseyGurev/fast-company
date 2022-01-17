import React, { useState, useEffect } from "react";
import Pagination from "../../common/pagination";
import { paginate } from "../../../utils/paginate";
import GroupList from "../../common/groupList";
import SearchStatus from "../../ui/searchStatus";
import _ from "lodash";
import UsersTable from "../../ui/usersTable";
import SearchUsers from "../../searchUsers";
import { searchUserText } from "../../../utils/searchUserText";
import { useUser } from "../../../hooks/useUsers";
import { useProfession } from "../../../hooks/useProfession";
import { useAuth } from "../../../hooks/useAuth";

const UsersListPage = () => {
    const pageSize = 6;
    const { isloading: professionsLoading, professions } = useProfession();
    const [currentPage, setCurrentPage] = useState(1);
    const { currentUser } = useAuth();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });
    const [searchUser, setSearchUser] = useState("");

    const { users } = useUser();

    const handleBookMark = (userId) => {
        const newArray =
            users.map((user) => {
                if (user._id === userId) {
                    user.bookmark = !user.bookmark;
                }
                return user;
            });
        console.log(newArray);
    };
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
    function filterUsers(data) {
        const filteredUsers = searchUser !== ""
            ? data.filter((user) => searchUserText(user.name, searchUser))
            : (selectedProf ? data.filter((user) => _.isEqual(user.profession, selectedProf)) : data);
        return filteredUsers.filter((u) => u._id !== currentUser._id);
    }

    if (users) {
        const filteredUsers = filterUsers(users);
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
                {professions && !professionsLoading && (
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
