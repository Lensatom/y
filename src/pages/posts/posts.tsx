import { Button, Text } from "@/components/base";
import { Avatar, AvatarFallback, AvatarImage, Container, Loader, Post } from "@/components/inc";
import { getDate, getTime } from "@/helpers";
import { IPost } from "@/interfaces";
import { getCollection, getData } from "@/services/firebase/firestore";
import { where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { BiRepost } from "react-icons/bi";
import { BsChat, BsHeart } from "react-icons/bs";
import { IoIosStats } from "react-icons/io";
import { MdShare } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { NewReply } from "./components";

const Posts = () => {
  
  const { pathname } = useLocation()
  
  const [replyingTo, setReplyingTo] = useState<IPost[]>([])
  const [postData, setPostData] = useState<IPost | null>(null)
  const [replies, setReplies] = useState<IPost[]>([])

  const getPost = async () => {
    setPostData(null)
    setReplies([])
    const postData:any = await getData("posts", pathname.split("/").pop() ?? "")
    setPostData(postData)
  }

  const getReplies = async () => {
    const replies:any = await getCollection("posts", [where("replyingTo", "==", postData?.id)])
    setReplies(replies)
  }

  const getReplyingTo = async (reply:IPost[]) => {
    let replyingTo:IPost[] = reply.at(-1)?.id !== postData?.id ? reply : []

    if (reply.at(-1)?.replyingTo) {
      const post:any = await getData("posts", reply.at(-1)?.replyingTo ?? "")
      return getReplyingTo([...replyingTo, post])
    }
    setReplyingTo(replyingTo.reverse())
  }

  useEffect(() => {
    getPost()
  }, [pathname])
  
  useEffect(() => {
    if (!postData) return
    if (postData.replyingTo) {
      getReplyingTo([postData])
    }
    getReplies()
  }, [postData])


  if (!postData) return <Loader />
  return (
    <div className="mt-4">
      {/* Posts in reply thread if any */}
      {replyingTo && replyingTo.map((post) => <Post thread {...post} />)}

      {/* Main post/reply */}
      <Container className="pb-4 border-b-0.5 flex flex-col items-start gap-3">
        {/* Poster's avatar */}
        <div className="flex items-center gap-2">
          <Avatar>
            {postData.photoURL && <AvatarImage src={postData.photoURL} />}
            <AvatarFallback>{postData.name[0]}</AvatarFallback>
          </Avatar>
          <Link to="" className="flex flex-col items-start">
            <Text variant="link" bold>{postData.name}</Text>
            <Text size="sm" variant="secondary">{postData.handle}</Text>
          </Link>
        </div>

        {/* Post content */}
        <Text className="text-white">{postData.content}</Text>

        {/* Date, time and view count */}
        <Text size="sm" variant="secondary">
          {getDate(postData.createdAt)} &#8226;
          {getTime(postData.createdAt)} &#8226;
          <span className="text-white">{" "}
            {postData.viewCount}
          </span> Views
        </Text>

        {/* Actions performable on post (like, repost, e.t.c) */}
        <div className="w-full py-1 px-1 flex justify-between items-center border-y-0.5">
          <Button variant="ghost" title="Reply" className="flex items-center gap-1 text-gray-500 hover:text-primary">
            <BsChat size={16} />
            <Text size="sm">{postData.replyCount}</Text>
          </Button>
          <Button variant="ghost" title="Repost" className="flex items-center gap-1 text-gray-500 hover:text-green-500">
            <BiRepost size={22} />
            <Text size="sm">{postData.repostCount}</Text>
          </Button>
          <Button variant="ghost" title="Like" className="flex items-center gap-1 text-gray-500 hover:text-pink-600">
            <BsHeart size={14} />
            <Text size="sm">{postData.likeCount}</Text>
          </Button>
          <Button variant="ghost" title="View" className="flex items-center gap-1 text-gray-500 hover:text-primary">
            <IoIosStats />
            <Text size="sm">{postData.viewCount}</Text>
          </Button>
          <Button variant="ghost" title="Share" className="text-gray-500 hover:text-primary">
            <MdShare size={16} />
          </Button>
        </div>

        {/* List of handles in reply thread */}
        <Text size="sm" variant="secondary" className="ml-12 flex gap-1">
          Replying to
          <Text className="text-primary">
            {postData.handle}
          </Text>
          {replyingTo.map((post, index) => (
            <Text key={post.id} className="text-primary">
              {index === replyingTo.length - 1 && "and "}
              {post.handle}
            </Text>
          ))}
        </Text>

        {/* reply field */}
        <NewReply replyingTo={postData.id} />
      </Container>

      {/* Replies under post */}
      {replies.map((post) => <Post {...post} />)}
    </div>
  )
}

export default Posts