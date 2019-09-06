import {
  UPDATE_TRACKS_DATA,
  UPDATE_TRACK_ID,
  UPDATE_TRACK_SEARCHED,
  CLEAN_SEARCH,
  FETCH_TRACK_FAILED,
  SHOW_SPINNER
} from "../actions/types";

const initialState = {
  trackList: [],
  trackId: null,
  trackIndex: null,
  trackSearched: [],
  spinnerState: false,
  fetchError: {}
};

export const updateTracksData = (prevState, tracks) => {
  return { ...prevState, trackList: [...prevState.trackList, ...tracks] };
};

export const updateTrackId = (prevState, id) => {
  let index = -1;
  prevState.trackList.forEach((track, idx) => {
    if (track.trackId === id) index = idx;
  });
  return {
    ...prevState,
    trackId: id,
    trackIndex: index
  };
};

export const updateTrackSearched = (prevState, name) => {
  const regex = new RegExp(`${name}`, "ig");
  return {
    ...prevState,
    trackSearched: prevState.trackList.filter(track =>
      track.trackName.match(regex)
    )
  };
};

export const cleanSearch = prevState => {
  return {
    ...prevState,
    trackList: []
  };
};

export const handleFetchError = prevState => {
  return {
    ...prevState,
    fetchError: {
      ...prevState.fetchError,
      fetchError: { ...prevState.fetchError, trackApiError: true }
    }
  };
};

export const handleSpinnerState = prevState => ({
  ...prevState,
  spinnerState: !prevState.spinnerState
});

const reducer = (prevState = initialState, action) => {
  switch (action.type) {
    case UPDATE_TRACKS_DATA:
      return updateTracksData(prevState, action.payload);
    case UPDATE_TRACK_ID:
      return updateTrackId(prevState, action.payload);
    case UPDATE_TRACK_SEARCHED:
      return updateTrackSearched(prevState, action.payload);
    case SHOW_SPINNER:
      return handleSpinnerState(prevState);
    case CLEAN_SEARCH:
      return cleanSearch(prevState);
    case FETCH_TRACK_FAILED:
      return handleFetchError(prevState);
    default:
      return prevState;
  }
};

export default reducer;
