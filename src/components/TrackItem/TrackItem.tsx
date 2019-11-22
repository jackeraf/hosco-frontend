import React from "react";
import moment from "moment";
import { ITrackItem } from "components";
import styled from "styled-components";

const TableDataWithImage = styled.td`
  width: 15%;
  transition: all 0.1s;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  :hover {
    transform: scale(1.1);
  }
`;

const TrackItem: React.FC<ITrackItem> = ({ track, goToDetailPage }) => {
  const parseDate = (date: string) => moment(date).format("YYYY MMM DD");
  const parseTrackLength = (length: number) => Math.round(length / 1000 / 60);
  return (
    <tr>
      <TableDataWithImage>
        <Image src={track.artworkUrl100} alt={track.trackName} />
      </TableDataWithImage>

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
