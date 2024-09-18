export interface IUserData {
  id: string | null;
  name: string | null;
  email: string | null;
  handle: string | null;
  photoURL: string | null;
  bio: string | null;
  coverPhotoURL: string;
  createdAt?: any
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
  replyingToHandle: string | null
  image0: string
  image1: string
  image2: string
  image3: string
  createdAt?: any
  reposterName?: string
}

export interface ITrend {
  trend: string;
  postCount: number;
}