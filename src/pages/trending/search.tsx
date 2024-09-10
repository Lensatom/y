import { Container, Loader, Post } from "@/components/inc";
import 'react-circular-progressbar/dist/styles.css';
import { useEffect, useState } from "react";
import { getCollection } from "@/services/firebase/firestore";
import { where } from "firebase/firestore";
import { IPost } from "@/interfaces";
import { FaSearch } from "react-icons/fa";
import { Input } from "@/components/base";
import { useLocation } from "react-router-dom";

const Search = () => {

  const [posts, setPosts] = useState<IPost[] | null>(null)
  const { search:query } = useLocation()
  const [search, setSearch] = useState(decodeURIComponent(query.split("=")[1]))

  const getPosts = async () => {
    const posts:any = await getCollection("posts", [where(search, "==", true)])
    setPosts(posts)
  }

  useEffect(() => {
    getPosts()
  }, [])

if (posts == null) return <Loader />
  return (
    <div className="min-h-screen w-full bg-background">
      <Container className="py-3">
        <div className="w-full h-10 bg-border flex gap-5 items-center px-6 rounded-full">
          <FaSearch className="text-gray-400" />
          <Input
            variant="ghost"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full"
            placeholder="Search"
          />
        </div>
      </Container>
      <div>
        {posts.map((post) => <Post search={search} {...post} />)}
      </div>
    </div>
  )
}

export default Search