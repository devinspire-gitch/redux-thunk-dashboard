import { todoDataRequest, todoDataSuccess, todoDataError } from "./Action";

export default function fetchTodos() {
    return async dispatch => {
        dispatch(todoDataRequest());
        await fetch('https://jsonplaceholder.typicode.com/todos')
        .then(res => res.json())
        .then(res => {
            if(res.error) {
                throw(res.error);
            }
            dispatch(todoDataSuccess(res));
            return res;
        })
        .catch(error => {
            dispatch(todoDataError(error));
        })
    }
}
