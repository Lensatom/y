import { Button, Text } from "@/components/base"
import { Avatar, AvatarFallback, AvatarImage, Container, Loader, Post, Tab } from "@/components/inc"
import { DEFAULTCOVERPHOTO } from "@/constants/constants"
import { getDate } from "@/helpers"
import { useFetch } from "@/hooks"
import { IPost } from "@/interfaces"
import { useUserStore } from "@/store"
import { where } from "firebase/firestore"
import { FaCalendar } from "react-icons/fa"
import { Link } from "react-router-dom"

const Profile = () => {

  const userData = useUserStore(state => state)

  const { data:posts } = useFetch<IPost[]>({
    path: ["posts"],
    type: "collection",
    conditions: [where("userId", "==", userData.id)]
  })

  const { data:replies } = useFetch<IPost[]>({
    path: ["posts"],
    type: "collection",
    conditions: [where("replyingTo", "!=", null)]
  })

  const { data:reposts } = useFetch<IPost[]>({
    path: ["posts"],
    type: "collection",
    conditions: [where("reposterId", "==", userData.id)]
  })

  const { data:bookmarks } = useFetch<IPost[]>({
    path: ["users", userData.id ?? "", "bookmarked"],
    type: "collection",
  })

  const tabs = {
    posts: <Posts posts={posts} />,
    replies: <Posts posts={replies} />,
    reposts: <Posts posts={reposts} />,
    bookmarks: <Posts posts={bookmarks} />
  }


  if (!userData.name) return <>Error</>

  return (
    <div className="w-full bg-background">
      <div className="w-full h-44 overflow-hidden bg-neutral-800 flex items-center">
        <img src={userData.coverPhotoURL ?? DEFAULTCOVERPHOTO} className="w-full" />
      </div>
      <Container className="flex flex-col gap-2 pb-4">
        <div className="w-full flex justify-between items-end -mt-20">
          <Avatar className="w-40 h-40 border-4 border-background">
            <AvatarImage src={userData.photoURL ?? undefined} />
            <AvatarFallback string={userData.id ?? ""}>{userData.name ? userData.name[0] : ""}</AvatarFallback>
          </Avatar>
          <div className="mb-5">
            <Link to="/user/edit">
              <Button size={"sm"} variant="outline" pill>Edit Profile</Button>
            </Link>
          </div>
        </div>
        <div>
          <Text size="xl" bold>{userData.name}</Text>
          <Text variant="secondary">{userData.handle}</Text>
        </div>
        <div>
          <Text>{userData.bio}</Text>
        </div>
        <div className="flex gap-4 items-center">
          <Text size="sm" variant="secondary" className="flex gap-1 items-center">
            <FaCalendar size={14} />
            {userData.createdAt && getDate(userData.createdAt ?? 0)}
          </Text>
        </div>
      </Container>
      <Tab tabs={tabs} />
      {/* {posts && posts.map(post => <Post {...post} />)} */}
    </div>
  )
}


const Posts = (props:{posts: IPost[] | undefined}) => {

  const {
    posts
  } = props

  if (!posts) return <Loader />
  return (
    <>
      {posts.map((post:IPost, index:number) => <Post key={index} {...post} />)}
    </>
  )
}

export default Profile