import {
    TODO_DATA_REQUEST,
    TODO_DATA_SUCCESS,
    TODO_DATA_ERROR
} from '../actions/ActionType'

const initialState = {
    loading: false,
    todos: [],
    error: null
}

export function todoReducer(state = initialState, action) {
    switch ( action.type ) {
        case TODO_DATA_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case TODO_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                todos: action.todos
            }
        case TODO_DATA_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                todos: []
            }
        default:
            return state;
        
    }
}