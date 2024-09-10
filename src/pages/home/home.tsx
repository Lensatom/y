import { Loader, Post } from "@/components/inc";
import 'react-circular-progressbar/dist/styles.css';
import { NewPost } from "./components";
import { useEffect, useState } from "react";
import { getCollection } from "@/services/firebase/firestore";
import { where } from "firebase/firestore";
import { IPost } from "@/interfaces";

const Home = () => {

  const [posts, setPosts] = useState<IPost[] | null>(null)

  const getPosts = async () => {
    const posts:any = await getCollection("posts", [where("replyingTo", "==", null)])
    setPosts(posts)
  }

  useEffect(() => {
    getPosts()
  }, [])

if (posts == null) return <Loader />
  return (
    <div className="min-h-screen w-full bg-background">
      <NewPost />
      <div>
        {posts.map((post) => <Post {...post} />)}
      </div>
    </div>
  )
}

export default Home