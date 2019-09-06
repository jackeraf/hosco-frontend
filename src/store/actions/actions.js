import {
  UPDATE_TRACKS_DATA,
  UPDATE_TRACK_ID,
  UPDATE_TRACK_SEARCHED,
  CLEAN_SEARCH,
  FETCH_TRACK_FAILED,
  SHOW_SPINNER
} from "../actions/types";

import searchItunes from "../../services/searchItunes";

export const updateTracks = response => ({
  type: UPDATE_TRACKS_DATA,
  payload: response.slice(0, 14)
});

export const getTracks = term => {
  return dispatch => {
    return searchItunes(term)
      .then(response => {
        const { results } = response.data;
        dispatch(updateTracks(results));
      })
      .catch(error => {
        dispatch(fetchError(error));
      });
  };
};

export const updateTrackId = id => ({
  type: UPDATE_TRACK_ID,
  payload: id
});

export const updateSearchedTrack = name => ({
  type: UPDATE_TRACK_SEARCHED,
  payload: name
});

export const cleanSearch = () => ({ type: CLEAN_SEARCH });

export const fetchError = () => ({ type: FETCH_TRACK_FAILED });
export const changeSpinnerState = () => ({ type: SHOW_SPINNER });
