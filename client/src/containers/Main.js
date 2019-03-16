import React from 'react';
import {Route, Switch, withRouter} from "react-router-dom";
import HomePage from '../components/HomePage';
import {connect} from 'react-redux';
import AuthForm from "../components/AuthForm"

const Main = () => {
    return (
        <div className="container">
            <Switch>
                <Route exact path="/"
                       render={props =>
                           <HomePage {...props}/>
                       }
                />
                <Route exact path="/signup"
                       render={props =>
                           <AuthForm {...props}
                                     signup
                                     buttonText="Sign me up!"
                                     heading="Join Warbler today."/>
                       }
                />
                <Route exact path="/signin"
                       render={props =>
                           <AuthForm {...props}
                                     buttonText="Log in"
                                     heading="Welcome back."/>
                       }
                />
            </Switch>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser
    }
}

export default withRouter(connect(mapStateToProps, null)(Main));