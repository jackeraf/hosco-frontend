import React, { useState, useReducer } from "react";
import { useHistory } from "react-router-dom";
import { reducer, actions, initialState, IActionPayload } from "store";
import "./TrackList.scss";
import TrackItem from "components/TrackItem/TrackItem";
import Notification from "components/shared/Notifications/Notification";
import Spinner from "components/shared/Spinner/Spinner";
import { RouteComponentProps } from "react-router";
import FormTrack from "components/Form/FormTrack";

const TrackList: React.FC<RouteComponentProps> = (
  props: RouteComponentProps
) => {
  let history = useHistory();
  console.log("history");
  console.log(history);
  const localInitialState = {
    currentTrackIndex: 0,
    value: "",
    headers: [
      "Cover Thumbnail",
      "Title",
      "Artist",
      "Album title",
      "Release date",
      "Song length",
      "Genre",
      "Price",
      ""
    ],
    unsorted: true,
    clickedColumn: {
      name: "",
      asc: false
    },
    restColumns: {
      asc: false
    }
  };
  const [reducerState, dispatch] = useReducer(reducer, initialState);
  const [state, setState] = useState(localInitialState);
  const handleChange = (event: { target: { value: string } }) => {
    if (validateInput(event.target.value)) {
      setState({ ...state, value: event.target.value });
    }
  };

  const validateInput = (value: string) => {
    return value.length === 0 ? false : true;
  };

  const handleSearch = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (validateInput(state.value)) {
      dispatch(actions.updateSearchedTrack(state.value));
      dispatch(actions.changeSpinnerState());
      actions.getTracks(state.value)(dispatch as IActionPayload);
    }
  };

  const handleCleanSearch = () => {
    dispatch(actions.cleanSearch());
    setState({ ...state, value: "" });
  };

  const goToDetailPage = (id: number) => {
    console.log("goToDetailPage clicked ", id);
    dispatch(actions.updateTrackId(id));
    history.push(`tracks/${id.toString()}`);
  };

  const enableClickOnSpecificHeaders = (header: string) => {
    const headers = ["Song length", "Genre", "Price"];
    return headers.includes(header);
  };
  const getHeaderKeyMapping = (field: string) => {
    const keyMappings: { [key: string]: string } = {
      "Song length": "trackTimeMillis",
      Genre: "primaryGenreName",
      Price: "trackPrice"
    };
    return keyMappings[field];
  };
  const handleSort = (field: string) => {
    const propsToChange = {
      unsorted: false,
      clickedColumn: {
        name: getHeaderKeyMapping(field),
        asc: !state.clickedColumn.asc
      },
      restColumns: {
        asc: !!state.clickedColumn.asc
      }
    };
    setState({ ...state, ...propsToChange });
  };
  const getSortedTracks = () => {
    const isAscending = () => state.clickedColumn.asc;
    const keyToSort: string = state.clickedColumn.name;
    return reducerState.trackList.sort((trackA, trackB) => {
      if (typeof (trackA as any)[keyToSort] === "string") {
        return isAscending()
          ? (trackB as any)[keyToSort].localeCompare((trackA as any)[keyToSort])
          : (trackA as any)[keyToSort].localeCompare(
              (trackB as any)[keyToSort]
            );
      }
      return isAscending()
        ? (trackB as any)[keyToSort] - (trackA as any)[keyToSort]
        : (trackA as any)[keyToSort] - (trackB as any)[keyToSort];
    });
  };
  const getColumnsSortState = (header: string) => {
    return state.clickedColumn.name === getHeaderKeyMapping(header)
      ? state.clickedColumn.asc
        ? "up"
        : "down"
      : state.restColumns.asc
      ? "up"
      : "down";
  };

  const getColorClickedColumn = (header: string) => {
    return state.clickedColumn.name === getHeaderKeyMapping(header)
      ? "#1db954"
      : "white";
  };

  const $renderHeaders = () => {
    return state.headers.map((header, index) => {
      let iconSortState = state.unsorted ? (
        enableClickOnSpecificHeaders(header) ? (
          <i className="fa fa-sort" />
        ) : null
      ) : enableClickOnSpecificHeaders(header) ? (
        <i
          className={"fa fa-sort-" + getColumnsSortState(header)}
          style={{ color: getColorClickedColumn(header) }}
        />
      ) : null;
      return (
        <th
          rowSpan={1}
          key={index}
          onClick={() =>
            enableClickOnSpecificHeaders(header) ? handleSort(header) : null
          }
        >
          {header}&nbsp;
          {iconSortState}
        </th>
      );
    });
  };
  const $renderTracksRows = () => {
    const tracksToRender =
      reducerState.trackSearched.length === 0
        ? getSortedTracks()
        : reducerState.trackSearched;
    return tracksToRender.map((track, index) => (
      <TrackItem
        key={index}
        track={track}
        index={index}
        goToDetailPage={goToDetailPage}
      />
    ));
  };

  const $renderNotification = () => {
    return reducerState.fetchError && reducerState.fetchError.trackApiError ? (
      <Notification />
    ) : null;
  };
  if (reducerState.spinnerState) return <Spinner />;
  return (
    <div>
      {$renderNotification()}
      <div className="container">
        <div className="row">
          <h2 className="track-list-header">Track List</h2>
        </div>

        <div className="row">
          <h4>Search by name: </h4>
        </div>
        <div className="row">
          <FormTrack handleSearch={handleSearch}>
            <FormTrack.InputTrack
              value={state.value}
              onChange={handleChange}
            ></FormTrack.InputTrack>
            <FormTrack.InputSubmit></FormTrack.InputSubmit>
            <FormTrack.ButtonWarning
              handleCleanSearch={handleCleanSearch}
            ></FormTrack.ButtonWarning>
          </FormTrack>
        </div>
        <div className="row">
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>{$renderHeaders()}</tr>
              </thead>
              <tbody>{$renderTracksRows()}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackList;
