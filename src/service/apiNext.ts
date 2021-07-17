
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export async function post<T>(
  url: string,
  data: T
) {
  const res = await api.post(url, data);

  return res.data;
}

export async function get(
  url: string,
) {
  const res = await api.get(url);

  return res.data
}
