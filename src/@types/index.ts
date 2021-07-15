
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

