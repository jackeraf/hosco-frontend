import axios from "axios";

const searchItunes = (term = "") => {
  const encodedTerm = term.split(" ").join("+");
  return axios.get(`https://itunes.apple.com/search?term=${encodedTerm}`);
};

export default searchItunes;
