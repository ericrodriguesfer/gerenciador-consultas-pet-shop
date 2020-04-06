import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Cancel from './pages/cancel';
import Conclude from './pages/conclude';
import Edit from './pages/edit';
import Finished from './pages/finished';
import Home from './pages/home';
import HomeEdit from './pages/homeEdit';
import Login from './pages/login';
import Register from './pages/register';
import Today from './pages/today';

function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/cancel" component={Cancel}></Route>
                <Route path="/conclude" component={Conclude}></Route>
                <Route path="/edit" component={Edit}></Route>
                <Route path="/finished" component={Finished}></Route>
                <Route path="/register" component={Register}></Route>
                <Route path="/today" component={Today}></Route>
                <Route path="/home/edit" component={HomeEdit}></Route>
                <Route path="/home" component={Home}></Route>
                <Route path="/" component={Login}></Route>
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;