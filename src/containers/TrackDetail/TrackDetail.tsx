import React, { useReducer, FC, useState, useEffect, useCallback } from "react";
import ReactAudioPlayer from "react-audio-player";
import * as actions from "../../store/actions/actions";
import reducer, { initialState } from "store/reducers/reducer";
import "./TrackDetail.scss";
import { ITrack } from "store";
import { RouteComponentProps } from "react-router";

const TrackDetail: FC<RouteComponentProps> = (props: RouteComponentProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [tracksIndex, setTracksIndex] = useState(0);
  const [cover, setCover] = useState("");
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");

  const handleTrackDetailsOnMount = useCallback(() => {
    const track = state.trackList.find(
      track => track.trackId === (props.match.params as any).id
    );
    if (!track) {
      props.history.replace("/");
      dispatch(actions.changeSpinnerState());
      return;
    }
    updateDetailTrack(track);
  }, [state, props]);

  useEffect(() => {
    if (state.trackList.length === 0) {
      props.history.replace("/");
    }
    handleTrackDetailsOnMount();
  }, [handleTrackDetailsOnMount, state, props]);

  const updateDetailTrack = (track: ITrack) => {
    setCover(track.artworkUrl100);
    setAuthor(track.artistName);
    setTitle(track.trackName);
    setPreviewUrl(track.previewUrl);
  };

  const goToNextTrack = () => {
    const next = state.trackIndex + 1;
    if (next > state.trackList.length - 1) return;
    const track = state.trackList[next];
    dispatch(actions.updateTrackId(track.trackId));
    setTracksIndex(next);

    updateDetailTrack(track);
  };

  const goToPreviousTrack = () => {
    const previous = state.trackIndex - 1;
    if (previous < 0) return;
    const track = state.trackList[previous];
    dispatch(actions.updateTrackId(track.trackId));
    setTracksIndex(tracksIndex - 1);
    updateDetailTrack(track);
  };
  if (state.trackList.length === 0) return null;
  return (
    <div className="track-details-wrapper">
      <div className="track-details-wrapper__button-back-wrapper">
        <button onClick={() => props.history.replace("/tracks")}>
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
            {state.trackIndex === 0 ? null : (
              <button onClick={() => goToPreviousTrack()}>Previous</button>
            )}
            {state.trackIndex === state.trackList.length - 1 ? null : (
              <button onClick={() => goToNextTrack()}>Next</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackDetail;
