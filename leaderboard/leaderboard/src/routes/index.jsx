import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import createBrowserHistory from 'history/createBrowserHistory';
import Login from '../components/pages/Login';
import Register from '../components/pages/Register';
import NoMatch from '../components/pages/NoMatch';
import DashboardPlayer from '../components/pages/DashboardPlayer';
import DashboardReferee from '../components/pages/DashboardReferee';
import DashboardPrivate from '../components/pages/DashboardPrivate';
import DashboardPublic from '../components/pages/DashboardPublic';

const history = createBrowserHistory();
const Routes = () => (
    <div>
        <BrowserRouter hisotry={history}>
            <Switch>
                 <Route exact path="/" render={() => (<Redirect to="/login" />)} /> 
                <Route path="/dashboardplayer" component={DashboardPlayer} />
                <Route path="/dashboardreferee" component={DashboardReferee} />
                <Route path="/dashboardprivate" component={DashboardPrivate} />
                <Route path="/dashboardpublic" component={DashboardPublic} />
                <Route path="/leaderboard" component={DashboardPrivate} />
                <Route path="/login" component= {Login} />
                <Route path="/register" component= {Register} />
                <Route component={NoMatch} />
            </Switch>
        </BrowserRouter>
    </div>
);

export default Routes

  