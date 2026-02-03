import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://698216e5c9a606f5d449022d.mockapi.io/",
  timeout: 10000,
});
