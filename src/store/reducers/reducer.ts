import {
  UPDATE_TRACKS_DATA,
  UPDATE_TRACK_ID,
  UPDATE_TRACK_SEARCHED,
  CLEAN_SEARCH,
  FETCH_TRACK_FAILED,
  SHOW_SPINNER,
  IInitialState,
  ITrack
} from "store/actions/types";

export const initialState: IInitialState = {
  trackList: [],
  trackId: 0,
  trackIndex: 0,
  trackSearched: [],
  spinnerState: false,
  fetchError: {}
};

export const updateTracksData = (
  prevState: IInitialState,
  tracks: ITrack[]
) => {
  return { ...prevState, trackList: [...prevState.trackList, ...tracks] };
};

export const updateTrackId = (
  prevState: IInitialState,
  id: number
): IInitialState => {
  let index = -1;
  prevState.trackList.forEach((track: ITrack, idx: number) => {
    if (track.trackId === id) index = idx;
  });
  return {
    ...prevState,
    trackId: id,
    trackIndex: index
  };
};

export const updateTrackSearched = (
  prevState: IInitialState,
  name: string
): IInitialState => {
  const regex = new RegExp(`${name}`, "ig");
  return {
    ...prevState,
    trackSearched: prevState.trackList.filter((track: ITrack) =>
      track.trackName.match(regex)
    )
  };
};

export const cleanSearch = (prevState: IInitialState) => {
  return {
    ...prevState,
    trackList: []
  };
};

export const handleFetchError = (prevState: IInitialState) => {
  return {
    ...prevState,
    fetchError: {
      ...prevState.fetchError,
      fetchError: { ...prevState.fetchError, trackApiError: true }
    }
  };
};

export const handleSpinnerState = (prevState: IInitialState) => ({
  ...prevState,
  spinnerState: !prevState.spinnerState
});

interface IActionPayload {
  type?: string;
  payload?: any;
}

const reducer = (prevState = initialState, action: IActionPayload): IInitialState => {
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
