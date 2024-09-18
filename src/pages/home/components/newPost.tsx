import { Button, TextArea } from "@/components/base";
import { Avatar, AvatarFallback, AvatarImage, Container, PostLengthProgress } from "@/components/inc";
import { MAXPOSTLENGTH } from "@/constants/constants";
import { getHashtags, postHashtags } from "@/helpers";
import { addData, updateData } from "@/services/firebase/firestore";
import { uploadFile } from "@/services/firebase/storage";
import { useUserStore } from "@/store";
import { increment } from "firebase/firestore";
import { useState } from "react";
import 'react-circular-progressbar/dist/styles.css';
import { BsImage } from "react-icons/bs";


interface Props {
  variant?: "post" | "reply",
  replyingTo?: string
  replyingToHandle?: string
}

const NewPost = (props:Props) => {

  const {
    variant,
    replyingTo,
    replyingToHandle
  } = props

  const { photoURL, name, handle, id:userId } = useUserStore((state) => state)
  const [isLoading, setIsLoading] = useState(false)
  const [images, setImages] = useState<any>([])

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
    replyingTo: replyingTo ? replyingTo : null,
    replyingToHandle: replyingToHandle ? replyingToHandle : null,
  }
  const [newPostContent, setNewPostContent] = useState("")

  const uploadImages = async (images:any, id:string, index?:number) => {
    index = index ?? 0
    if (index === images.length) return
    await uploadFile(images[index], `${id}${index}`)
    await updateData("posts", id, {[`image${index}`]: `${id}${index}`})
    return uploadImages(images, id, index + 1)
  }

  const handleNewPost = async () => {
    setIsLoading(true)
    
    const newPostData = {
      ...defaultNewPostData,
      content: newPostContent
    }
    const id = await addData("posts", "auto", newPostData)

    if (variant === "reply") {
      await updateData("posts", replyingTo ?? "", {replyCount: increment(1)})
    }
    
    const hashtags = getHashtags(newPostContent)
    if (hashtags.length) {
      await postHashtags(hashtags, id)
    }
    if (images.length) {
      await uploadImages(images, id ?? "")
    }
    
    setNewPostContent("")
    setIsLoading(false)
  }

  if (variant === "reply" ) {
    return (
      <div className=" w-full flex gap-3">
        <Avatar>
          <AvatarImage src={photoURL ?? ""} />
          <AvatarFallback string={userId ?? ""}>{name && name[0]}</AvatarFallback>
        </Avatar>
        <div className="w-full flex flex-col items-end">
          <TextArea
            variant="ghost"
            placeholder="Post your reply"
            className="placeholder:text-xl w-full min-h-10 h-12 max-h-52 py-1 outline-none text-lg"
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
          ></TextArea>
          <div className="flex items-center gap-3">
            {newPostContent && <PostLengthProgress postLength={newPostContent.length} />}
            <Button
              pill
              disabled={!newPostContent || (newPostContent.length > MAXPOSTLENGTH) || isLoading}
              onClick={handleNewPost}
            >Reply</Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <Container className="border-b-0.5 flex flex-col items-end pt-10">
      <div className=" w-full flex gap-3">
        <Avatar>
          <AvatarImage src={photoURL ?? ""} />
          <AvatarFallback string={userId ?? ""}>{name && name[0]}</AvatarFallback>
        </Avatar>
        <div className="w-full border-b-0.5">
          <TextArea
            variant="ghost"
            placeholder="What's happenening?!"
            className="placeholder:text-xl w-full min-h-10 h-12 max-h-52 py-1 outline-none text-lg"
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
          ></TextArea>
          {images.length ? (
            <div className="flex w-full h-80 mb-5 gap-1">
              <div className="w-full h-full flex flex-col gap-1">
                {images[0] && (
                  <div
                    className="w-full h-full overflow-hidden"
                    style={{
                      backgroundImage: `url(${URL.createObjectURL(images[0])})`,
                      backgroundSize: "cover"
                    }}
                  />
                )}
                {images[2] && (
                  <div
                  className="w-full h-full overflow-hidden"
                  style={{
                    backgroundImage: `url(${URL.createObjectURL(images[2])})`,
                    backgroundSize: "cover"
                  }}
                />
                )}
              </div>
              <div className="w-full h-full flex flex-col gap-1">
                {images[1] && (
                  <div
                    className="w-full h-full overflow-hidden"
                    style={{
                      backgroundImage: `url(${URL.createObjectURL(images[1])})`,
                      backgroundSize: "cover"
                    }}
                  />
                )}
                {images[3] && (
                  <div
                    className="w-full h-full overflow-hidden"
                    style={{
                      backgroundImage: `url(${URL.createObjectURL(images[3])})`,
                      backgroundSize: "cover"
                    }}
                  />
                )}
              </div>
            </div>
           ) : null}
        </div>
      </div>
      <div className="w-full py-5 flex items-center justify-end h-full gap-5">
        {newPostContent && (
          <div className="border-r-0.5 h-full px-5 w-full flex justify-between items-center pl-16">
            <label htmlFor="addImage" className="cursor-pointer">
              <BsImage className="text-primary" />
            </label>
            <input
              id="addImage"
              type="file"
              className="hidden"
              accept=".png, .jpg, .jpeg, .gif"
              onChange={(e) => setImages(e.target.files)}
              multiple
            />
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