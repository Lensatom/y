import { Text } from "@/components/base";
import { Container, Loader, Post } from "@/components/inc";
import { IPost } from "@/interfaces";
import { addData, dataExists, getCollection, getData, updateData } from "@/services/firebase/firestore";
import { useUserStore } from "@/store";
import { increment, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { NewReply } from "./components";

const Posts = () => {
  
  const { pathname } = useLocation()
  
  const { id:userId } = useUserStore(state => state)

  const [replyingTo, setReplyingTo] = useState<IPost[] | null>(null)
  const [postData, setPostData] = useState<IPost | null>(null)
  const [replies, setReplies] = useState<IPost[] | null>(null)
  
  const isLoading = !postData || replyingTo === null || replies === null

  const handleView = async () => {
    const engaged = await dataExists("users", userId ?? "", ["engaged", postData?.id ?? ""])
    if (engaged) return
    const payload = {viewCount: increment(1)}
    await updateData("posts", postData?.id ?? "", payload)
    await addData("users", userId ?? "", {engaged: true}, ["engaged", postData?.id ?? ""])
  }

  const resetData = () => {
    setPostData(null)
    setReplyingTo(null)
    setReplies(null)
  }

  const getPost = async () => {
    resetData()
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
    } else {
      setReplyingTo([])
    }
    getReplies()
  }, [postData])

  useEffect(() => {
    if (!postData) return

    handleView()

    setTimeout(() => {
      const element = document.getElementById(postData.id);
      element?.scrollIntoView({
        behavior: 'smooth'
      });
    }, 500)
  }, [isLoading])


  if (isLoading) return <Loader />
  return (
    <div className="pb-[300px]">
      {/* Posts in reply thread if any */}
      {replyingTo && replyingTo.map((post) => <Post thread {...post} />)}

      {/* Main post/reply */}
      <Container id={postData?.id} className="pt-1 pb-4 border-b-0.5 flex flex-col items-start gap-3">
        <Post {...postData} ownsPage />

        {/* List of handles in reply thread */}
        <Text size="sm" variant="secondary" className="ml-12 flex gap-1">
          Replying to
          <Text className="text-primary">
            {postData?.handle}
          </Text>
          {replyingTo?.map((post, index) => (
            <Text key={post.id} className="text-primary">
              {index === replyingTo?.length - 1 && "and "}
              {post.handle}
            </Text>
          ))}
        </Text>

        {/* reply field */}
        <NewReply replyingTo={postData?.id ?? "x"} />
      </Container>

      {/* Replies under post */}
      {replies?.map((post) => <Post {...post} />)}
    </div>
  )
}

export default Posts