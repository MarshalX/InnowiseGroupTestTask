import { combineReducers } from 'redux'
import { SET_ME } from '../actions/types'


const MeReducer = (state = {me: null}, action) => {
    switch (action.type) {
        case SET_ME:
            return Object.assign({}, state, { ...action.me });
        default:
            return state;
    }
};

const testTask = combineReducers({
    MeReducer,
});

export default testTask
