import React from "react";
import TableBody from "./tableBody";
import TableHeader from "./tableHeader";
import PropTypes from "prop-types";

const Table = ({ onSort, selectedSort, columns, data, count, children }) => {
    let tableClasses = "table";
    if (count === 0) {
        tableClasses += " d-none";
    }
    return (
        <table className={tableClasses} id="table">
            {children ||
                <>
                    <TableHeader {...{ onSort, selectedSort, columns }} />
                    <TableBody {... { columns, data }} />
                </>
            }
        </table>
    );
};

Table.propTypes = {
    onSort: PropTypes.func,
    selectedSort: PropTypes.object.isRequired,
    columns: PropTypes.object.isRequired,
    data: PropTypes.array.isRequired,
    count: PropTypes.number.isRequired,
    children: PropTypes.array
};

export default Table;
