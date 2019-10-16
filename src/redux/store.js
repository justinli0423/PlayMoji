// GLOBAL STORE
import { createStore } from 'redux';


const initialStates = {
    accessToken: '',
    songs: {},
    emojis: {},

}

const reducers = (state = initialStates, action) => {
    switch(action.type) {
        case 'LOGIN_TOKEN': {
            const { accessToken } = action.payload;
            return {
                ...state,
                accessToken
            }
        }
        case 'UPDATE_SONGS': {
            const { songs } = action.payload;
            return {
                ...state,
                songs,
            }
        }
        default:
            return state;
    }
}

export default createStore(reducers);