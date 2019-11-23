import axios from "axios";
import { ITrackResponse } from "components";

const searchItunes = (
  term = ""
): Promise<{ data: { results: ITrackResponse[] } }> => {
  const encodedTerm = term.split(" ").join("+");
  return axios.get(`https://itunes.apple.com/search?term=${encodedTerm}`);
};

export default searchItunes;
