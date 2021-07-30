import {
    USER_DATA_REQUEST,
    USER_DATA_SUCCESS,
    USER_DATA_ERROR
} from '../actions/ActionType'

const initialState = {
    loading: false,
    users: [],
    error: null
}

export function userReducer(state = initialState, action) {
    switch ( action.type ) {
        case USER_DATA_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case USER_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.users
            }
        case USER_DATA_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                users: []
            }
        default:
            return state;
        
    }
}