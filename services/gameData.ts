import axios from "axios";

export const getGameData = async (url: string) => {
  try {
    return await axios.get(url);
  } catch (err) {
    console.error(err);
  }
};
