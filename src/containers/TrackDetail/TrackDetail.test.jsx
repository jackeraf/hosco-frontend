import React from "react";
import { mount, shallow } from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import * as mocks from "../../mock/itunesResponse";
import { UnConnectedTrackDetail } from "./TrackDetail";
import storeUtil from "../../utils/test/storeUtil";
jest.mock("../../services/searchItunes");
import searchItunes from "../../services/searchItunes";

Enzyme.configure({ adapter: new Adapter() });

searchItunes.mockImplementation(() => Promise.resolve(mocks.itunesResponse()));

describe("<TrackDetail> component", () => {
  let spy = null;
  let TrackDetail = null;

  beforeEach(() => {
    const getTracksMocked = jest.fn();
    const updateTrackIdMocked = jest.fn();
    const props = {
      trackList: mocks.itunesResponse().results,
      getTracks: getTracksMocked,
      updateTrackId: updateTrackIdMocked,
      match: {
        params: {
          id: 1413921155
        }
      }
    };
    TrackDetail = <UnConnectedTrackDetail store={storeUtil} {...props} />;
  });

  afterEach(() => {
    spy.mockClear();
  });

  it("checks if it mounts", () => {
    spy = jest.spyOn(UnConnectedTrackDetail.prototype, "componentDidMount");
    mount(TrackDetail);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("h3 from id 1413921155 should return Smells Like Teen Spirit", () => {
    const wrapper = shallow(TrackDetail);
    expect(
      wrapper.find(".track-details-wrapper__center__right__title").text()
    ).toEqual("Smells Like Teen Spirit");
  });
});
