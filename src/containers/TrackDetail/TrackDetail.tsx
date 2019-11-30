import React, { FC, useEffect, useCallback } from "react";
import ReactAudioPlayer from "react-audio-player";
import { actions } from "store";
import "./TrackDetail.scss";
import { RouteComponentProps } from "react-router";
import { useTrackList } from "containers/contexts/TrackListProvider";

const TrackDetail: FC<RouteComponentProps> = (props: RouteComponentProps) => {
  const { reducerState, dispatch } = useTrackList();
  const { history, match } = props;
  const tracksIndex = reducerState.trackIndex;
  const {
    artworkUrl100: cover,
    artistName: author,
    trackName: title,
    previewUrl
  } = reducerState.trackList[tracksIndex];

  const handleTrackDetailsOnMount = useCallback(() => {
    const track = reducerState.trackList.find(
      track => track.trackId === +(match.params as any).id
    );
    if (!track) {
      history.replace("/");
      dispatch(actions.changeSpinnerState());
      return;
    }
  }, [dispatch, history, match, reducerState]);

  useEffect(() => {
    if (reducerState.trackList.length === 0) {
      history.replace("/");
    }
    handleTrackDetailsOnMount();
  }, [reducerState, history, handleTrackDetailsOnMount]);

  const goToNextTrack = () => {
    const next = reducerState.trackIndex + 1;
    if (next > reducerState.trackList.length - 1) return;
    const track = reducerState.trackList[next];
    dispatch(actions.updateTrackId(track.trackId));
  };

  const goToPreviousTrack = () => {
    const previous = reducerState.trackIndex - 1;
    if (previous < 0) return;
    const track = reducerState.trackList[previous];
    dispatch(actions.updateTrackId(track.trackId));
  };
  if (reducerState.trackList.length === 0) return null;
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
            {reducerState.trackIndex === 0 ? null : (
              <button onClick={() => goToPreviousTrack()}>Previous</button>
            )}
            {reducerState.trackIndex ===
            reducerState.trackList.length - 1 ? null : (
              <button onClick={() => goToNextTrack()}>Next</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackDetail;
