import { Button, TextArea } from "@/components/base";
import { Avatar, AvatarFallback, AvatarImage, Container, PostLengthProgress } from "@/components/inc";
import { MAXPOSTLENGTH } from "@/constants/constants";
import { getHashtags, postHashtags } from "@/helpers";
import { addData } from "@/services/firebase/firestore";
import { useUserStore } from "@/store";
import { useState } from "react";
import 'react-circular-progressbar/dist/styles.css';

const NewPost = () => {

  const { photoURL, name, handle, id:userId } = useUserStore((state) => state)
  const [isLoading, setIsLoading] = useState(false)

  const defaultNewPostData = {
    photoURL,
    name,
    handle,
    userId,
    content: "",
    likeCount: 0,
    replyCount: 0,
    repostCount: 0,
    viewCount: 0,
    replyingTo: null
  }
  const [newPostContent, setNewPostContent] = useState("")

  const handleNewPost = async () => {
    setIsLoading(true)
    
    const newPostData = {
      ...defaultNewPostData,
      content: newPostContent
    }
    const id = await addData("posts", "auto", newPostData)
    
    const hashtags = getHashtags(newPostContent)
    await postHashtags(hashtags, id)
    
    setNewPostContent("")
    setIsLoading(false)
  }

  return (
    <Container className="border-b-0.5 flex flex-col items-end pt-10">
      <div className=" w-full flex gap-3">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="w-full border-b-0.5">
          <TextArea
            variant="ghost"
            placeholder="What's happenening?!"
            className="placeholder:text-xl w-full min-h-10 h-12 max-h-52 py-1 outline-none text-lg"
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
          ></TextArea>
        </div>
      </div>
      <div className="py-5 flex items-center h-full gap-5">
        {newPostContent && (
          <div className="border-r-0.5 h-full px-5">
            <PostLengthProgress postLength={newPostContent.length} />
          </div>
        )}
        <Button
          disabled={!newPostContent || (newPostContent.length > MAXPOSTLENGTH) || isLoading}
          onClick={handleNewPost}
          pill
          className="px-8"
        >Post</Button>
      </div>
    </Container>
  )
}

export default NewPost