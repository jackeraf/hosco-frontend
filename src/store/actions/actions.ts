import {
  UPDATE_TRACKS_DATA,
  UPDATE_TRACK_ID,
  UPDATE_TRACK_SEARCHED,
  CLEAN_SEARCH,
  FETCH_TRACK_FAILED,
  SHOW_SPINNER,
  ITrack,
  IActionPayload,
  actions
} from "store";

import searchItunes from "../../services/searchItunes";

export const updateTracks = (response: ITrack[]) => ({
  type: UPDATE_TRACKS_DATA,
  payload: response.slice(0, 14)
});

export const getTracks = (term: string): React.Dispatch<IActionPayload> => {
  return (dispatch: any): Promise<void> => {
    return searchItunes(term)
      .then(response => {
        const { results } = response.data;
        dispatch(actions.changeSpinnerState());
        dispatch(updateTracks(results));
      })
      .catch(() => {
        dispatch(fetchError());
      });
  };
};

export const updateTrackId = (id: number) => ({
  type: UPDATE_TRACK_ID,
  payload: id
});

export const updateSearchedTrack = (name: string) => ({
  type: UPDATE_TRACK_SEARCHED,
  payload: name
});

export const cleanSearch = () => ({ type: CLEAN_SEARCH });

export const fetchError = () => ({ type: FETCH_TRACK_FAILED });
export const changeSpinnerState = () => ({ type: SHOW_SPINNER });
