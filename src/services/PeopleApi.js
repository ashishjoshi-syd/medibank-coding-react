import axios from 'axios';

export const getPeopleData = async (url) => {
  const { data } = await axios.get(url);
  return data;
};