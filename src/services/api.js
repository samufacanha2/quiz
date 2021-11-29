import axios from "axios";

const api = axios.create({
  baseURL: "https://opentdb.com",
  timeout: 5000,
});
export default api;
