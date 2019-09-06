import React from "react";
import { mount, shallow } from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import TrackList, { UnConnectedTrackList } from "./TrackList";
import TrackItem from "../../components/TrackItem/TrackItem";
import Notification from "../../components/shared/Notifications/Notification";
import * as actions from "../../store/actions/actions";
import * as mocks from "../../mock/itunesResponse";
import storeUtil from "../../utils/test/storeUtil";
jest.mock("../../services/searchItunes");
import searchItunes from "../../services/searchItunes";

Enzyme.configure({ adapter: new Adapter() });

searchItunes.mockImplementation(() =>
  Promise.resolve({ data: mocks.itunesResponse() })
);

describe("<TrackList />", () => {
  const TrackListComponent = <TrackList store={storeUtil} />;

  it("checks if component mounted", () => {
    const reduxConnectMock = {
      trackList: jest.fn(),
      trackId: jest.fn(),
      trackSearched: jest.fn(),
      error: jest.fn(),
      spinnerState: jest.fn(),
      getTracks: jest.fn(),
      updateTrackId: jest.fn(),
      updateSearchedTrack: jest.fn(),
      cleanSearch: () => jest.fn(),
      changeSpinnerState: () => jest.fn()
    };
    const componentDidMount = jest.fn();
    UnConnectedTrackList.prototype.componentDidMount = componentDidMount;
    mount(<UnConnectedTrackList {...reduxConnectMock} store={storeUtil} />);
    expect(componentDidMount).toHaveBeenCalledTimes(1);
    expect.assertions(1);
  });

  it("checks empty value state from input ", () => {
    const wrapper = mount(shallow(TrackListComponent).get(0));
    expect(wrapper.state("value")).toEqual("");
    expect.assertions(1);
  });

  it("changes state value input", () => {
    const wrapper = mount(shallow(TrackListComponent).get(0));
    wrapper.setState({ value: "foo" });
    expect(wrapper.state("value")).toEqual("foo");
    expect.assertions(1);
  });

  it("renders 15 <TrackItem /> components", () => {
    const props = {
      getTracks: jest.fn().mockImplementation(() => Promise.resolve()),
      updateSearchedTrack: jest.fn(),
      trackSearched: [],
      trackList: mocks.itunesResponse().results.slice(0, 15),
      changeSpinnerState: jest.fn()
    };
    const wrapper = mount(<UnConnectedTrackList {...props} />);
    expect(wrapper.find(TrackItem)).toHaveLength(15);
    expect.assertions(1);
  });

  it("simulates a search", async () => {
    const name = "nirvana";
    const updateSearchedTrackMocked = jest.fn();
    const props = {
      getTracks: jest.fn().mockImplementation(() => Promise.resolve()),
      updateSearchedTrack: updateSearchedTrackMocked,
      trackSearched: [],
      trackList: mocks.itunesResponse().results,
      changeSpinnerState: jest.fn()
    };
    const wrapper = shallow(<UnConnectedTrackList {...props} />);
    let spy = jest.spyOn(wrapper.instance(), "handleSearch");
    wrapper.setState({ value: name });
    const form = wrapper.find("form");
    form.simulate("submit", { preventDefault() {} });
    expect(spy).toHaveBeenCalledTimes(1);
    const updateSearchedTrackMockedCount =
      updateSearchedTrackMocked.mock.calls.length;
    expect(updateSearchedTrackMockedCount).toBe(1);
    expect.assertions(2);
  });

  it("displays notification toast on fetch error", () => {
    const props = {
      trackList: mocks.itunesResponse().results,
      trackSearched: [],
      error: { trackApiError: true }
    };
    const wrapper = shallow(<UnConnectedTrackList {...props} />);
    expect(wrapper.find(Notification)).toHaveLength(1);
    expect.assertions(1);
  });
});
