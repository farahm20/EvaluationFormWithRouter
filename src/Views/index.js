import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Answers from './Answers';
import User from './User';
import Questionnaire from './Questionnaire';
import Success from './Success';

const Views = () => {
    return (
        <Router>
            <Route exact path="/" component={Questionnaire} />
            <Route exact path="/answers" component={Answers} />
            <Route path="/user/:id" component={User} />
            <Route path="/success" component={Success} />
        </Router>
    );
};
export default Views;