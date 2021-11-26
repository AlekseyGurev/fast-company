import React from "react";
import NavBar from "./components/ui/navBar";
import Users from "./layouts/users";
import { Route, Switch, Redirect } from "react-router-dom";
import Main from "./layouts/main";
import Login from "./layouts/login";
import { ToastContainer } from "react-toastify";
import { ProfessionProvider } from "./hooks/useProfession";
import { QualitiesProvider } from "./hooks/useQualities";
import AuthProvider from "./hooks/useAuth";

const App = () => {
    return (
        <div>
            <AuthProvider>
                <NavBar/>
                <QualitiesProvider>
                    <ProfessionProvider>
                        <Switch>
                            <Route path="/login/:type?" component={Login} />
                            <Route path="/users/:userId?/:edit?" component={Users} />
                            <Route path="/" component={Main} />
                            <Redirect to="/"/>
                        </Switch>
                    </ProfessionProvider>
                </QualitiesProvider>
            </AuthProvider>
            <ToastContainer/>
        </div>
    );
};

export default App;
