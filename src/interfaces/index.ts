export interface IUserData {
  id: string | null;
  name: string | null;
  email: string | null;
  handle: string | null;
  photoURL: string | null
}

export interface IPost {
  id: string;
  photoURL: string
  name: string
  handle: string
  userId: string
  content: string
  likeCount: number
  replyCount: number
  repostCount: number
  viewCount: number
  replyingTo: string | null
  createdAt?: any
}

export interface ITrend {
  trend: string;
  postCount: number;
}