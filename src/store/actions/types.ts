export const UPDATE_TRACKS_DATA = "UPDATE_TRACKS_DATA";
export const UPDATE_TRACK_ID = "UPDATE_TRACK_ID";
export const UPDATE_TRACK_SEARCHED = "UPDATE_TRACK_SEARCHED";
export const CLEAN_SEARCH = "CLEAN_SEARCH";
export const FETCH_TRACK_FAILED = "FETCH_TRACK_FAILED";
export const SHOW_SPINNER = "SHOW_SPINNER";

export interface ITrack {
  trackId: string;
  artworkUrl100: string;
  artistName: string;
  trackName: string;
  previewUrl: string;
}

export interface IInitialState {
  trackList: ITrack[];
  trackId: string;
  trackIndex: number;
  trackSearched: ITrack[];
  spinnerState: boolean;
  fetchError: any;
}
