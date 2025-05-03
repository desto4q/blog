import type { ListResult, RecordModel } from "pocketbase";

export interface Post {
  body: string;
  title: string;
  created: string;
  updated: string;
  thumb: string;
  collenctionName: string;
  id: string;
}
export interface PostResult extends ListResult<Post> {}

export interface PAGINATOR {
  totalPages: number;
  currentPage: number;
}

export interface USERINFO {
  avatar: string;
  collectionId: string;
  collectionName: string;
  created: string;
  email: string;
  emailVisibility: boolean;
  id: string;
  name: string;
  updated: string;
  verified: boolean;
}

export interface POSTRESPONSE extends Post {
  views: {
    id: string;
    collectionId: string;
    reads: number;
    views: number;
    post_id: string;
  };
  expand: any;
}

export interface Views extends RecordModel {
  id: string;
  collectionId: string;
  reads: number;
  views: number;
  post_id: string;
}

export interface VIEWPOST extends Views {
  expand: {
    post_id: Post;
  };
}
export interface POPULARPOST extends ListResult<VIEWPOST> {
  items: VIEWPOST[];
}
