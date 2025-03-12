import axios from "axios";

const token = localStorage.getItem("authToken");

export const api = axios.create({
  baseURL: 'https://localhost:7238/api/',
  headers: {
    Authorization: `Bearer ${token}`,
  }
});