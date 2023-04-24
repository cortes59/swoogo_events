import axios from "axios";

console.log({
  baseURL: process.env.REACT_APP_API_URL,
});
const service = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export default service;
