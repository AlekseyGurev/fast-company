import React from "react";
import PropTypes from "prop-types";
const SearchStatus = ({ length }) => {
    const renderPhrase = (number) => {
        let classes = "h1 badge bg-";
        let result;
        if (number === 0) {
            classes += "danger";
            result = `Никто не тусанет сегодня с тобой`;
            // tableClasses += " d-none";
        } else {
            classes += "primary";
            if ((number > 1) & (number < 5)) {
                result = `${number} человека тусанет с тобой сегодня`;
            } else {
                result = `${number} человек тусанет с тобой сегодня`;
            }
        }
        return (
            <h2>
                <span className={classes}>{result}</span>
            </h2>
        );
    };
    return <div>{renderPhrase(length)}</div>;
};
SearchStatus.propTypes = {
    length: PropTypes.number.isRequired
};
export default SearchStatus;
