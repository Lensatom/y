import { Button, TextArea } from "@/components/base"
import { Avatar, AvatarFallback, AvatarImage, PostLengthProgress } from "@/components/inc"
import { MAXPOSTLENGTH } from "@/constants/constants"
import { getHashtags } from "@/helpers"
import { addData, dataExists, updateData } from "@/services/firebase/firestore"
import { useUserStore } from "@/store"
import { increment } from "firebase/firestore"
import { useState } from "react"

interface Props {
  replyingTo: string;
}

const NewReply = (props:Props) => {

  const {
    replyingTo
  } = props

  const { photoURL, name, handle, id:userId } = useUserStore((state) => state)

  const defaultNewReplyData = {
    photoURL,
    name,
    handle,
    userId,
    content: "",
    likeCount: 0,
    replyCount: 0,
    repostCount: 0,
    viewCount: 0,
    replyingTo
  }
  const [newReplyContent, setNewReplyContent] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  
  const postHashtags = async (hashtags:string[]) => {
    if (!hashtags.length) return
    
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
    return postHashtags(hashtags)
  }

  const handleNewReply = async () => {
    setIsLoading(true)

    const hashtags = getHashtags(newReplyContent)
    const hashtagMap = hashtags.reduce((acc, curr) => {return {...acc, [curr]: true}}, {})

    const newPostData = {
      ...defaultNewReplyData,
      content: newReplyContent,
      ...hashtagMap
    }
    await addData("posts", "auto", newPostData)
    
    await postHashtags(hashtags)
    
    setNewReplyContent("")
    setIsLoading(false)
  }

  return (
    <div className=" w-full flex gap-3">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="w-full flex flex-col items-end">
        <TextArea
          variant="ghost"
          placeholder="Post your reply"
          className="placeholder:text-xl w-full min-h-10 h-12 max-h-52 py-1 outline-none text-lg"
          value={newReplyContent}
          onChange={(e) => setNewReplyContent(e.target.value)}
        ></TextArea>
        <div className="flex items-center gap-3">
          {newReplyContent && <PostLengthProgress postLength={newReplyContent.length} />}
          <Button
            pill
            disabled={!newReplyContent || (newReplyContent.length > MAXPOSTLENGTH) || isLoading}
            onClick={handleNewReply}
          >Reply</Button>
        </div>
      </div>
    </div>
  )
}

export default NewReply