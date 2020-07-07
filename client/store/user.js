import axios from 'axios';

//ACTION TYPES

const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER';

//INITIAL STATE

const initialDefaultUser = {}

//ACTION CREATORS
const getUser = user => ({ type: GET_USER, user });
const removeUser = () => ({ type: REMOVE_USER });

/**
 * THUNK CREATORS
 */

export const signup = (email, password) => {
    return async dispatch => {
        try {

            let user = await axios.post(`api/auth/signup`, { email, password })
            dispatch(getUser(user.data))

        } catch (error) {
            console.error(error)
        }
    };
}

export const logout = () => {
    return async dispatch => {
        try {
            await axios.post(`api/auth/logout`)
            dispatch(removeUser());

        } catch (error) {
            console.error(error)
        }
    };
}

export default function (state = initialDefaultUser, action) {
    switch (action.type) {
        case GET_USER:
            return action.user;
        case REMOVE_USER:
            return defaultUser;
        default:
            return state
    }
}