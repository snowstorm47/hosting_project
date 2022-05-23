import axios from "axios";
export const baseURL = "http://165.22.95.60/api/v1"||"http://localhost:8080/api/v1";
const instance = axios.create({
  baseURL: baseURL,
});

export default instance;
