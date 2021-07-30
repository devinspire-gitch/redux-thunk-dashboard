import { userDataRequest, userDataSuccess, userDataError } from "./Action";

export default function fetchUsers() {
    return async dispatch => {
        dispatch(userDataRequest());
        await fetch('https://jsonplaceholder.typicode.com/users')
        .then(res => res.json())
        .then(res => {
            if(res.error) {
                throw(res.error);
            }
            dispatch(userDataSuccess(res));
            return res;
        })
        .catch(error => {
            dispatch(userDataError(error));
        })
    }
}

