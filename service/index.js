import axios from "axios";
import { API_URL, API_KEY } from "@env";
// const API_URL = "https://api.example.com";
// const API_KEY = "YOUR_API_KEY";
const fetchData = async () => {
  const response = await fetch(`${API_URL}/endpoint`, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });
  const data = await response.json();
  console.log(data);
};

const sendAxiosDataToserver = async ({
  data,
  method = "POST",
  headers = {},
  url,
}) => {
  console.log("in sendAxiosDataToserver", data);
  const response = await axios[method.toLowerCase()](API_URL + url, data, {
    headers,
  });
  return response.data;
};

export { sendAxiosDataToserver };
