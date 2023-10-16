import axios from "axios";

const request = axios.create({
  baseURL: "https://652cf06ff9afa8ef4b267dca.mockapi.io/",
  timeout: 10000,
});

export default request;
