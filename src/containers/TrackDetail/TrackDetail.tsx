import React, { FC, useState, useEffect, useCallback } from "react";
import ReactAudioPlayer from "react-audio-player";
import { actions, ITrack } from "store";
import "./TrackDetail.scss";
import { RouteComponentProps } from "react-router";
import { useTrackList } from "containers/contexts/TrackListProvider";

const TrackDetail: FC<RouteComponentProps> = (props: RouteComponentProps) => {
  console.log("TrackDetail");
  const { reducerState, dispatch } = useTrackList();
  const { history, match } = props;
  console.log("state");
  console.log(reducerState);
  const [tracksIndex, setTracksIndex] = useState(0);
  const [cover, setCover] = useState("");
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");

  const handleTrackDetailsOnMount = useCallback(() => {
    const track = reducerState.trackList.find(
      track => track.trackId === +(match.params as any).id
    );
    if (!track) {
      history.replace("/");
      dispatch(actions.changeSpinnerState());
      return;
    }
    updateDetailTrack(track);
  }, [reducerState, history, dispatch, match]);

  useEffect(() => {
    if (reducerState.trackList.length === 0) {
      history.replace("/");
    }
    handleTrackDetailsOnMount();
  }, [handleTrackDetailsOnMount, reducerState, history]);

  const updateDetailTrack = useCallback((track: ITrack) => {
    setCover(track.artworkUrl100);
    setAuthor(track.artistName);
    setTitle(track.trackName);
    setPreviewUrl(track.previewUrl);
  }, []);

  const goToNextTrack = () => {
    const next = reducerState.trackIndex + 1;
    if (next > reducerState.trackList.length - 1) return;
    const track = reducerState.trackList[next];
    dispatch(actions.updateTrackId(track.trackId));
    setTracksIndex(next);
    updateDetailTrack(track);
  };

  const goToPreviousTrack = () => {
    const previous = reducerState.trackIndex - 1;
    if (previous < 0) return;
    const track = reducerState.trackList[previous];
    dispatch(actions.updateTrackId(track.trackId));
    setTracksIndex(tracksIndex - 1);
    updateDetailTrack(track);
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
