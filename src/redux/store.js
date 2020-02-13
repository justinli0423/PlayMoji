// GLOBAL STORE
import { createStore } from 'redux';

const initialStates = {
  accessToken: '',
  userId: '',
  songs: [],
  emojis: '',
  additionaProperties: {
    danceability: 0,
    energy: 0,
    liveness: 0,
    loudness: 0,
    mode: 0,
    popularity: 0,
    valence: 0,
  },
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
        eventsTriggered: state.eventsTriggered + 1,
      };
    }
    case 'UPDATE_EMOJIS': {
      const { emojis } = action.payload;
      return {
        ...state,
        emojis,
        eventsTriggered: state.eventsTriggered + 1,
      };
    }
    case 'UPDATE_ADDITIONAL_PROPS': {
      const { additionaProperties } = action.payload;
      return {
        ...state,
        additionaProperties,
        eventsTriggered: state.eventsTriggered + 1,
      };
    }
    default:
      return state;
  }
};

export default createStore(reducers);
