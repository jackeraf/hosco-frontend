import reducer from "./reducer";
import * as actions from "../actions/actions";
import * as mocks from "../../mock/itunesResponse";
jest.mock("../../services/searchItunes");
import searchItunes from "../../services/searchItunes";
import {
  updateTracksData,
  updateTrackId,
  updateTrackSearched,
  cleanSearch,
  handleFetchError
} from "../reducers/reducer";

searchItunes.mockImplementation(() => Promise.resolve(mocks.itunesResponse()));

const initialState = {
  trackList: [],
  trackId: null,
  trackSearched: []
};

describe("Tracks reducer", () => {
  it("should return trackList", () => {
    return searchItunes().then(response => {
      const tracks = response.results;
      let actionObject = actions.updateTracks(tracks);
      expect(reducer(initialState, actionObject)).toEqual(
        updateTracksData(initialState, tracks.slice(0, 14))
      );
      expect.assertions(1);
    });
  });

  it("should return track id", () => {
    const trackId = 0;
    expect(reducer(initialState, actions.updateTrackId(trackId))).toEqual(
      updateTrackId(initialState, trackId)
    );
    expect.assertions(1);
  });

  it("should return tracks related to term searched", () => {
    const trackName = "Nirvana";
    return searchItunes().then(response => {
      let stateWithTrackList = {
        trackList: response.results,
        trackId: null,
        trackSearched: []
      };
      expect(
        reducer(stateWithTrackList, actions.updateSearchedTrack(trackName))
      ).toEqual(updateTrackSearched(stateWithTrackList, trackName));
      expect.assertions(1);
    });
  });

  it("should clean searches", () => {
    const stateWithSearches = {
      trackList: [],
      trackId: null,
      trackSearched: mocks.tracksSearched()
    };
    expect(reducer(stateWithSearches, actions.cleanSearch())).toEqual(
      cleanSearch(stateWithSearches)
    );
    expect.assertions(1);
  });

  it("handles error", () => {
    expect(reducer(initialState, actions.fetchError())).toEqual(
      handleFetchError(initialState)
    );
    expect.assertions(1);
  });
});
