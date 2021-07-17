import { JwtPayload } from "jsonwebtoken";

export interface ICreateCommunity {
  title: string;
  creatorSlug: string;
  imageUrl: string;
}

export interface ICommunity {
  id: number
  title: string;
  creatorSlug: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITokenInfos extends JwtPayload {
  githubUser: string;
  roles: string[];
  iat: number;
  exp: number;
}

export interface IPosts {
  id: number;
  author: string;
  text: string;
  iconUser: string;
}

export interface IPostsDato {
  id: number;
  author: string;
  text: string;
  createdAt: Date;
}

export interface ICreatePosts {
  author: string;
  text: string;
}
