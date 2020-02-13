export const setAccessToken = accessToken => ({
  type: 'LOGIN_TOKEN',
  payload: {
    accessToken,
  },
});

export const setUserId = userId => ({
  type: 'USER_ID',
  payload: {
    userId,
  },
});

export const updateSongList = songs => ({
  type: 'UPDATE_SONGS',
  payload: {
    songs,
  },
});

export const updateEmojiList = emojis => ({
  type: 'UPDATE_EMOJIS',
  payload: {
    emojis,
  },
});

export const updateAdditionalProps = additionaProperties => ({
  type: 'UPDATE_ADDITIONAL_PROPS',
  payload: {
    additionaProperties,
  },
});
