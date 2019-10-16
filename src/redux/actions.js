export const setAccessToken = accessToken => ({
    type: 'LOGIN_TOKEN',
    payload: {
        accessToken
    }
});

export const updateSongList = songs => ({
    type: 'UPDATE_SONGS',
    payload: {
        songs
    }
});