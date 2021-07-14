
import axios from 'axios';
import { Dispatch, SetStateAction } from 'react';

/*
{
  login: 'followers',
  id: 5664102,
  node_id: 'MDQ6VXNlcjU2NjQxMDI=',
  avatar_url: 'https://avatars.githubusercontent.com/u/5664102?v=4',
  gravatar_id: '',
  url: 'https://api.github.com/users/followers',
  html_url: 'https://github.com/followers',
  followers_url: 'https://api.github.com/users/followers/followers',
  following_url: 'https://api.github.com/users/followers/following{/other_user}',
  gists_url: 'https://api.github.com/users/followers/gists{/gist_id}',
  starred_url: 'https://api.github.com/users/followers/starred{/owner}{/repo}',
  subscriptions_url: 'https://api.github.com/users/followers/subscriptions',
  organizations_url: 'https://api.github.com/users/followers/orgs',
  repos_url: 'https://api.github.com/users/followers/repos',
  events_url: 'https://api.github.com/users/followers/events{/privacy}',
  received_events_url: 'https://api.github.com/users/followers/received_events',
  type: 'User',
  site_admin: false,
  name: null,
  company: null,
  blog: '',
  location: null,
  email: null,
  hireable: null,
  bio: null,
  twitter_username: null,
  public_repos: 3,
  public_gists: 0,
  followers: 3,
  following: 0,
  created_at: '2013-10-11T12:23:29Z',
  updated_at: '2016-02-27T11:39:00Z'
}
*/

interface IGitHubApi {
  login: string;
  id: number;
  avatar_url: string;
  type: string;
  html_url: string;
}

const api = axios.create(
  {
    baseURL: 'https://api.github.com'
  }
);

export const getFollowers = async (
  user: string,
  setData: Dispatch<SetStateAction<any>> ) => {
    const res = await api.get(`/users/${user}/followers`);
    const data: IGitHubApi[] = res.data;

    setData(data.map((follower) => {
      return {
        id: follower.id,
        title: follower.login,
        img: follower.avatar_url,
        link: follower.html_url
      }
    }))
};

export const getFollow = async (
  user: string,
  setData: Dispatch<SetStateAction<any>> ) => {
    const res = await api.get(`/users/${user}/following`);
    const data: IGitHubApi[] = res.data;

    setData(data.map((follow) => {
      return {
        id: follow.id,
        title: follow.login,
        img: follow.avatar_url,
        link: follow.html_url
      }
    }))
};
