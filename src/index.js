import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';

import './index.css';
import OKR from './pages/OKRs/OKRs';
import Search from './pages/Search/Search';
import Dashboard from './pages/Dashboard/Dashboard';
import Info from './pages/Info/Info'

import * as serviceWorker from './serviceWorker';

const routes = (
    <Router>
        <div>
            <Switch>
                <Route path="/" exact component={OKR} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/search" component={Search} />
                <Route path="/about" component={Info} /> 
            </Switch>
        </div>
    </Router>
);

ReactDOM.render(routes, document.getElementById('root'));

serviceWorker.unregister();