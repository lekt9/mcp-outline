import axios from "axios";

const API_URL = process.env.API_URL;
const API_KEY = process.env.API_KEY;

export const outlineClient = axios.create({
    baseURL: API_URL,
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });