import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';

import './index.css';
import OKR from './pages/OKRs/OKRs';
import Search from './pages/Search/Search';

import * as serviceWorker from './serviceWorker';

const routes = (
    <Router>
        <div>
            <Switch>
                <Route exact path="/" component={OKR} />
                <Route path="/search" component={Search} />
            </Switch>
        </div>
    </Router>
);

ReactDOM.render(routes, document.getElementById('root'));

serviceWorker.unregister();
