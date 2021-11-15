import React from "react";
import NavBar from "./components/ui/navBar";
import Users from "./layouts/users";
import { Route, Switch } from "react-router-dom";
import Main from "./layouts/main";
import Login from "./layouts/login";
import { ToastContainer } from "react-toastify";
import { ProfessionProvider } from "./hooks/useProfession";
import { QualitiesProvider } from "./hooks/useQualities";

const App = () => {
    return (
        <div>
            <NavBar/>
            <Switch>
                <ProfessionProvider>
                    <QualitiesProvider>
                        <Route path="/login/:type?" component={Login} />
                        <Route path="/users/:userId?/:edit?" component={Users} />
                    </QualitiesProvider>
                </ProfessionProvider>
                <Route path="/" component={Main} />
            </Switch>
            <ToastContainer/>
        </div>
    );
};

export default App;
