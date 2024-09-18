import { Input } from "@/components/base";
import { Container, Loader, Post } from "@/components/inc";
import { useFetch } from "@/hooks";
import { IPost } from "@/interfaces";
import { where } from "firebase/firestore";
import { useEffect, useState } from "react";
import 'react-circular-progressbar/dist/styles.css';
import { FaSearch } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const Search = () => {

  const { search:query } = useLocation()
  const [search, setSearch] = useState(decodeURIComponent(query.split("=")[1]))
  const {data:posts, isLoading, refresh} = useFetch<IPost[]>({
    path: ["posts"],
    type: "collection",
    conditions: [where(search, "==", true)]
  })

  useEffect(() => {
    if (posts === undefined) return
    refresh()
  }, [search])

  useEffect(() => {
    setSearch(decodeURIComponent(query.split("=")[1]))
  }, [query])

if (isLoading) return <Loader />
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
        {posts?.map((post) => <Post search={search} {...post} />)}
      </div>
    </div>
  )
}

export default Search