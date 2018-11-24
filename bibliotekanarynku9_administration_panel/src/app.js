import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import 'normalize.css';
import MainRouter from './mainRouter';

ReactDOM.render(
    <Router>
        <MainRouter />
    </Router>,
    document.getElementById('app')
);
