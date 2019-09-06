import React from "react";
import moment from "moment";

const TrackItem = ({ track, goToDetailPage }) => {
  const parseDate = date => moment(date).format("YYYY MMM DD");
  const parseTrackLength = length => Math.round(length / 1000 / 60);
  return (
    <tr>
      <td className="image-table-data">
        <img
          className="thumbnail thumbnail-animation"
          src={track.artworkUrl100}
          alt={track.name}
        />
      </td>

      <td>{track.trackName}</td>
      <td>{track.artistName}</td>
      <td>{track.collectionName}</td>
      <td>{parseDate(track.releaseDate)}</td>
      <td>{parseTrackLength(track.trackTimeMillis)} mins</td>
      <td>{track.primaryGenreName}</td>
      <td>{track.trackPrice}</td>
      <td>
        <button
          className="btn btn-success"
          onClick={() => goToDetailPage(track.trackId)}
        >
          <i className="fa fa-eye" data-toggle="tooltip" title="View details" />
        </button>
      </td>
    </tr>
  );
};

export default TrackItem;
