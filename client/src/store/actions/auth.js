import {apiCall} from "../../services/api"
import {SET_CURRENT_USER} from "../actionTypes";
import {addError, removeError} from "./error";

export function setCurrentUser(user){
    return {
        type: SET_CURRENT_USER,
        user
    }
};

export function authUser(type, userData) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            apiCall("post", `api/auth/${type}`, userData )
                .then(({token, ...user}) => {
                    localStorage.setItem("jwtToken", token);
                    dispatch(removeError());
                    dispatch(setCurrentUser(user));
                    resolve();
                })
                .catch(err => {
                    dispatch(addError(err.message));
                    reject();
                })
        })
    }
}