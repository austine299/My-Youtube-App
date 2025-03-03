import axios from "axios";

const BASE_URL = "https://youtube-v31.p.rapidapi.com"

const options = {
    params: {
      maxResults: '50'
    },
    headers: {
      'x-rapidapi-key': 'c33fd4467bmsh4f4e1e5dd5c376ep125290jsn3f4daa1a5600',
      'x-rapidapi-host': 'youtube-v31.p.rapidapi.com'
    }
  };

export const FetchFromAPI  = async (url) =>{
    const {data} = await axios.get(`${BASE_URL}/${url}`, options);

    return data;
}