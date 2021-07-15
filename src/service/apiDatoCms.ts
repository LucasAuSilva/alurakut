
import axios from 'axios';
import { Dispatch, SetStateAction } from 'react';
import { ICommunity } from '../@types';

const api = axios.create(
  {
    baseURL: 'https://graphql.datocms.com/',
    headers: {
      'Authorization': 'eb2c494edf5578ab97b84309d1f771',
      'Content-type': 'application/json',
      'Accept': 'application/json'
    }
  }
)

export const getCommunities = async (
  setData: Dispatch<SetStateAction<any>>
) => {
  const res = await api.post('', {
    "query": `query {
      allCommunities {
        id
        title
        imageUrl
        creatorSlug
      }
    }`
  });

  const data: ICommunity[] = res.data.data.allCommunities;

  setData(data.map((community) => {
    return {
      id: community.id,
      title: community.title,
      img: community.imageUrl,
      link: `/communities/${community.id}`
    }
  }));
}
