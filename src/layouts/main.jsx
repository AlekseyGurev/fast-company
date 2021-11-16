import React from "react";
import useMock from "../utils/mockData";

const Main = () => {
    const { error, initialize, progress, status } = useMock();
    const handleClick = () => {
        initialize();
    };
    return <div className="container mt5">
        <h1>Main</h1>
        <h3>Ининциальзация данных в FireBase</h3>
        <ul>
            <li>Status:{status}</li>
            <li>Progress:{progress}</li>
            {error && <li>Error:{error}</li>}
        </ul>
        <button className="btn btn-primary" onClick={handleClick}>Инициализация</button>
    </div>;
};

export default Main;
