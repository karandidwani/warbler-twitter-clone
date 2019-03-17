import React from 'react';
import {Route, Switch, withRouter} from "react-router-dom";
import HomePage from '../components/HomePage';
import {connect} from 'react-redux';
import AuthForm from "../components/AuthForm";
import {authUser} from "../store/actions/auth";
import {removeError} from "../store/actions/error";


const Main = (props) => {
    const {authUser, error, removeError, currentUser} = props;
    return (
        <div className="container">
            <Switch>
                <Route exact path="/"
                       render={props =>
                           <HomePage
                               {...props}
                               currentUser={currentUser}/>
                       }
                />
                <Route exact path="/signup"
                       render={props =>
                           <AuthForm {...props}
                                     signup
                                     buttonText="Sign me up!"
                                     heading="Join Warbler today."
                                     onAuth={authUser}
                                     errors={error}
                                     removeErrors={removeError}/>
                       }
                />
                <Route exact path="/signin"
                       render={props =>
                           <AuthForm {...props}
                                     buttonText="Log in"
                                     heading="Welcome back."
                                     onAuth={authUser}
                                     errors={error}
                                     removeErrors={removeError}/>
                       }
                />
            </Switch>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser,
        error: state.error
    }
}

export default withRouter(connect(mapStateToProps, {authUser, removeError})(Main));