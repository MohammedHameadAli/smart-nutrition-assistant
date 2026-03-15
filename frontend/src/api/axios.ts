import axios from "axios";

const api = axios.create({//axios instance
  baseURL: "http://127.0.0.1:8000",//base url so u dont repeat
});

api.interceptors.request.use((config) => { //it runs before every api req
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;//auto adds bearer token
  }
  return config;
});

export default api;
