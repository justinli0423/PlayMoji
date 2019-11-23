// GLOBAL STORE
import { createStore } from 'redux';


const initialStates = {
  accessToken: '',
  userId: '',
  songs: [],
  emojis: '',
  eventsTriggered: 0,
};

const reducers = (state = initialStates, action) => {
  switch (action.type) {
    case 'USER_ID': {
      const { userId } = action.payload;
      return {
        ...state,
        userId,
      };
    }
    case 'LOGIN_TOKEN': {
      console.log(`Setting AccessToken: ${action.payload.accessToken}`);
      const { accessToken } = action.payload;
      return {
        ...state,
        accessToken,
      };
    }
    case 'UPDATE_SONGS': {
      const { songs } = action.payload;
      return {
        ...state,
        songs,
        eventsTriggered: ++state.eventsTriggered,
      };
    }
    case 'UPDATE_EMOJIS': {
      const { emojis } = action.payload;
      return {
        ...state,
        emojis,
        eventsTriggered: ++state.eventsTriggered,
      };
    }
    default:
      return state;
  }
};

export default createStore(reducers);
