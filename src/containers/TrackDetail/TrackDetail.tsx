import React, { Component } from "react";
import { connect } from "react-redux";
import ReactAudioPlayer from "react-audio-player";
import * as actions from "../../store/actions/actions";
import "./TrackDetail.scss";

export class UnConnectedTrackDetail extends Component {
  state = {
    tracksIndex: 0,
    cover: "",
    author: "",
    title: "",
    previewUrl: ""
  };

  handleTrackDetailsOnMount() {
    const track = this.props.trackList.find(
      track => track.trackId === +this.props.match.params.id
    );
    if (!track) {
      this.props.history.replace("/");
      this.props.changeSpinnerState();
      return;
    }
    this.updateDetailTrack(track);
  }

  componentDidMount() {
    if (this.props.trackList.length === 0) {
      this.props.history.replace("/");
    }
    this.handleTrackDetailsOnMount();
  }

  updateDetailTrack(track) {
    this.setState({
      cover: track.artworkUrl100,
      author: track.artistName,
      title: track.trackName,
      previewUrl: track.previewUrl
    });
  }

  goToNextTrack = () => {
    const next = this.props.trackIndex + 1;
    if (next > this.props.trackList.length - 1) return;
    const track = this.props.trackList[next];
    this.props.updateTrackId(track.trackId);
    this.setState(prevState => ({
      tracksIndex: prevState.tracksIndex + 1
    }));
    this.updateDetailTrack(track);
  };

  goToPreviousTrack = () => {
    const previous = this.props.trackIndex - 1;
    if (previous < 0) return;
    const track = this.props.trackList[previous];
    this.props.updateTrackId(track.trackId);
    this.setState(prevState => ({
      tracksIndex: prevState.tracksIndex - 1
    }));
    this.updateDetailTrack(track);
  };

  render() {
    if (this.props.trackList.length === 0) return null;
    const { cover, author, title, previewUrl } = this.state;
    return (
      <div className="track-details-wrapper">
        <div className="track-details-wrapper__button-back-wrapper">
          <button onClick={() => this.props.history.replace("/tracks")}>
            Go Home
          </button>
        </div>
        <div className="track-details-wrapper__center">
          <div className="track-details-wrapper__center__left">
            <img src={cover} alt="" />
          </div>
          <div className="track-details-wrapper__center__right">
            <h2>{author}</h2>
            <h2 className="track-details-wrapper__center__right__title">
              {title}
            </h2>

            <ReactAudioPlayer src={previewUrl} autoPlay controls />
            <div className="track-details-wrapper__center__right__buttons">
              {this.props.trackIndex === 0 ? null : (
                <button onClick={() => this.goToPreviousTrack()}>
                  Previous
                </button>
              )}
              {this.props.trackIndex ===
              this.props.trackList.length - 1 ? null : (
                <button onClick={() => this.goToNextTrack()}>Next</button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const trackList = state.trackList.length !== 0 ? state.trackList : [];
  const spinnerState = state.spinnerState;
  const trackIndex = state.trackIndex;
  return {
    trackList,
    spinnerState,
    trackIndex
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getTracks: term => dispatch(actions.getTracks(term)),
    updateTrackId: id => dispatch(actions.updateTrackId(id)),
    changeSpinnerState: () => dispatch(actions.changeSpinnerState())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UnConnectedTrackDetail);
