import {
    USER_DATA_REQUEST,
    USER_DATA_SUCCESS,
    USER_DATA_ERROR,
    TODO_DATA_REQUEST,
    TODO_DATA_SUCCESS,
    TODO_DATA_ERROR
} from './ActionType';

export function userDataRequest() {
    return {
        type: USER_DATA_REQUEST
    };
}

export function userDataSuccess(users) {
    return {
        type: USER_DATA_SUCCESS,
        users
    };
}

export function userDataError(error) {
    return {
        type: USER_DATA_ERROR,
        payload: error
    };
}

export function todoDataRequest() {
    return {
        type: TODO_DATA_REQUEST
    };
}

export function todoDataSuccess(todos) {
    return {
        type: TODO_DATA_SUCCESS,
        todos
    };
}

export function todoDataError(error) {
    return {
        type: TODO_DATA_ERROR,
        payload: { error }
    };
}


