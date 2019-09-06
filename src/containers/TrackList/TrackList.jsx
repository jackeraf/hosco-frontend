import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/actions";
import "./TrackList.scss";
import TrackItem from "../../components/TrackItem/TrackItem";
import Notification from "../../components/shared/Notifications/Notification";
import Spinner from "../../components/shared/Spinner/Spinner";

export class UnConnectedTrackList extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
  }

  handleChange = event => {
    if (this.validateInput(event.target.value)) {
      this.setState({ value: event.target.value });
    }
  };

  validateInput(value) {
    return value.length === 0 ? false : true;
  }

  handleSearch = event => {
    event.preventDefault();
    if (this.validateInput(this.state.value)) {
      this.props.updateSearchedTrack(this.state.value);
      this.props.changeSpinnerState();
      return this.props
        .getTracks(this.state.value)
        .then(() => this.props.changeSpinnerState());
    }
  };

  handleCleanSearch = () => {
    this.props.cleanSearch();
    this.setState({
      value: ""
    });
  };

  goToDetailPage = id => {
    this.props.updateTrackId(id);
    this.props.history.push({
      pathname: `tracks/${id}`
    });
  };

  enableClickOnSpecificHeaders(header) {
    return header === "Song length" || header === "Genre" || header === "Price";
  }
  getHeaderKeyMapping(field) {
    const keyMappings = {
      "Song length": "trackTimeMillis",
      Genre: "primaryGenreName",
      Price: "trackPrice"
    };
    return keyMappings[field];
  }
  handleSort(field) {
    const propsToChange = {
      unsorted: false,
      clickedColumn: {
        name: this.getHeaderKeyMapping(field),
        asc: !this.state.clickedColumn.asc
      },
      restColumns: {
        asc: !!this.state.clickedColumn.asc
      }
    };
    const stateToChange = Object.assign({}, this.state, propsToChange);
    this.setState(stateToChange);
  }
  getSortedTracks() {
    const isAscending = () => this.state.clickedColumn.asc;
    const keyToSort = this.state.clickedColumn.name;
    return this.props.trackList.sort((trackA, trackB) => {
      if (typeof trackA[keyToSort] === "string") {
        return isAscending()
          ? trackB[keyToSort].localeCompare(trackA[keyToSort])
          : trackA[keyToSort].localeCompare(trackB[keyToSort]);
      }
      return isAscending()
        ? trackB[keyToSort] - trackA[keyToSort]
        : trackA[keyToSort] - trackB[keyToSort];
    });
  }
  getColumnsSortState(header) {
    return this.state.clickedColumn.name === this.getHeaderKeyMapping(header)
      ? this.state.clickedColumn.asc
        ? "up"
        : "down"
      : this.state.restColumns.asc
      ? "up"
      : "down";
  }

  getColorClickedColumn(header) {
    return this.state.clickedColumn.name === this.getHeaderKeyMapping(header)
      ? "#1db954"
      : "white";
  }

  $renderHeaders() {
    return this.state.headers.map((header, index) => {
      let iconSortState = this.state.unsorted ? (
        this.enableClickOnSpecificHeaders(header) ? (
          <i className="fa fa-sort" />
        ) : null
      ) : this.enableClickOnSpecificHeaders(header) ? (
        <i
          className={"fa fa-sort-" + this.getColumnsSortState(header)}
          style={{ color: this.getColorClickedColumn(header) }}
        />
      ) : null;
      return (
        <th
          rowSpan="1"
          key={index}
          onClick={() =>
            this.enableClickOnSpecificHeaders(header)
              ? this.handleSort(header, index)
              : null
          }
        >
          {header}&nbsp;
          {iconSortState}
        </th>
      );
    });
  }
  $renderTracksRows() {
    const tracksToRender =
      this.props.trackSearched.length === 0
        ? this.getSortedTracks()
        : this.props.trackSearched;
    return tracksToRender.map((track, index) => (
      <TrackItem
        key={index}
        track={track}
        index={index}
        goToDetailPage={this.goToDetailPage}
      />
    ));
  }

  $renderNotification() {
    return this.props.error && this.props.error.trackApiError ? (
      <Notification />
    ) : null;
  }

  render() {
    if (this.props.spinnerState) return <Spinner />;
    return (
      <div>
        {this.$renderNotification()}
        <div className="container">
          <div className="row">
            <h2 className="track-list-header">Track List</h2>
          </div>

          <div className="row">
            <h4>Search by name: </h4>
          </div>
          <div className="row">
            <form onSubmit={this.handleSearch}>
              <input
                className="search-track-box"
                type="text"
                name="name"
                value={this.state.value}
                onChange={this.handleChange}
              />
              <input type="submit" className="btn btn-spotify" value="Search" />
              <button
                className="btn btn-warning"
                onClick={() => this.handleCleanSearch()}
              >
                <i className="fa fa-refresh" />
                Clean Search
              </button>
            </form>
          </div>
          <div className="row">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>{this.$renderHeaders()}</tr>
                </thead>
                <tbody>{this.$renderTracksRows()}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const trackList = state.trackList.length !== 0 ? state.trackList : [];
  const trackId = state.trackId;
  const trackSearched = state.trackSearched;
  const spinnerState = state.spinnerState;
  const error = state.fetchError;
  return {
    trackList,
    trackId,
    trackSearched,
    error,
    spinnerState
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getTracks: term => dispatch(actions.getTracks(term)),
    updateTrackId: id => dispatch(actions.updateTrackId(id)),
    updateSearchedTrack: name => dispatch(actions.updateSearchedTrack(name)),
    cleanSearch: () => dispatch(actions.cleanSearch()),
    changeSpinnerState: () => dispatch(actions.changeSpinnerState())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UnConnectedTrackList);
