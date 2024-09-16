import { addData, dataExists, updateData } from "@/services/firebase/firestore"
import { increment } from "firebase/firestore"

export const getHashtags = (post:string) => {
  const words = post.split(" ")
  const hashtags = words.filter((word) => word[0] === "#" && word.length > 0)
  return hashtags
}

export const postHashtags:any = async (hashtags:string[], id:string, initialIndex?:number ) => {
  if (initialIndex === hashtags.length) {
    const hashtagMap = hashtags.reduce((acc, curr) => {return {...acc, [curr]: true}}, {})
    await updateData("posts", id, {...hashtagMap})
    return
  }
  
  initialIndex = initialIndex ?? 0
  hashtags = hashtags.slice(initialIndex, hashtags.length)

  const hashtag = hashtags[0]
  const trendExists = await dataExists("trends", hashtag)

  if (trendExists) {
    const payload = {postCount: increment(1)}
    updateData("trends", hashtag, payload)
  } else {
    const payload = {
      trend: hashtag,
      postCount: 1
    }
    addData("trends", hashtag, payload)
  }
  
  hashtags.shift()
  return postHashtags(hashtags, initialIndex + 1)
}

export const getDate = (timestamp:any) => {
  const date = new Date(timestamp.toDate());
  const options:any = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
  return formattedDate;
}

export const getTime = (timestamp:any) => {
  return timestamp.toDate().toLocaleTimeString()
}