import React from "react";
import NavBar from "./components/navBar";
import Users from "./layouts/users";
import { Route, Switch } from "react-router-dom";
import Main from "./layouts/main";
import Login from "./layouts/login";
const App = () => {
    return (
        <div>
            <NavBar/>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/users/:userId?" component={Users} />
                <Route path="/" component={Main} />
            </Switch>
        </div>
    );
};

export default App;
