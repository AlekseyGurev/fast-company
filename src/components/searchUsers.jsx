import React from "react";
import PropTypes from "prop-types";

const SearchUsers = ({ value, handleSearch }) => {
    return (
        <input type="text"
            value={value}
            onChange={handleSearch}
            placeholder="Search..."
        />);
};

SearchUsers.propTypes = {
    value: PropTypes.string,
    handleSearch: PropTypes.func
};

export default SearchUsers;
