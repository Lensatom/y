import { Loader, Post } from "@/components/inc";
import { useFetch } from "@/hooks";
import { IPost } from "@/interfaces";
import 'react-circular-progressbar/dist/styles.css';
import { NewPost } from "./components";

const Home = () => {

  const { data:posts, isLoading } = useFetch<IPost[]>({path: ["posts"], type: "collection"})

  if (isLoading || !posts) return <Loader />
  return (
    <div className="min-h-screen w-full bg-background">
      <NewPost />
      <div>
        {posts.map((post:IPost) => <Post {...post} />)}
      </div>
    </div>
  )
}

export default Home