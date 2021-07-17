
import axios, { AxiosRequestConfig } from 'axios';

interface IToken {
  token: string
}

const api = axios.create({
  baseURL: 'https://alurakut.vercel.app/api/'
});

export const postAlurakut = async (
  url: string,
  githubUser: string,
): Promise<any> => {
  const res = await api.post(url, {
    githubUser
  });

  return res.data;
}

export const getAlurakut = async (
  url: string,
  token: string
) => {
  const res = await api.get(url, {
    headers: {
      "Authorization": token,
    },
  });

  return res.data;
}
