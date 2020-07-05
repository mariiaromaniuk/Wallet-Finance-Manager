import axios from 'axios';

//ACTION TYPES

const GET_USER = 'GET_USER'


//ACTION CREATORS
const getUser = user => ({ type: GET_USER, user });


/**
 * THUNK CREATORS
 */
const initialState = {}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_USER:
        default:
            return state
    }
}