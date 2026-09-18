import { Button, Text } from "@/components/base"
import { Avatar, AvatarFallback, AvatarImage, Container, Loader, Post, Tab } from "@/components/inc"
import { DEFAULTCOVERPHOTO } from "@/constants/constants"
import { getDate } from "@/helpers"
import { useFetch } from "@/hooks"
import { IPost, IUserData } from "@/interfaces"
import { useUserStore } from "@/store"
import { where } from "firebase/firestore"
import { useEffect, useState } from "react"
import { FaCalendar } from "react-icons/fa"
import { Link, useLocation } from "react-router-dom"

const Profile = () => {

  const currUserData = useUserStore(state => state)
  const { pathname } = useLocation()
  const user = pathname.split("/").at(-1)
  const isMe = user === "me" || user === currUserData.handle
  const [userData, setUserData] = useState<IUserData | null>(null)

  const { data:profileData, isLoading } = useFetch<IUserData[]>({
    path: ["users"],
    type: "collection",
    get: !isMe
  })

  useEffect(() => {
    if (isMe) {
      setUserData(currUserData)
    }
  })

  useEffect(() => {
    if (!profileData) return
    if (profileData.length === 0) return
    setUserData(profileData[0])
  }, [profileData])

  const { data:posts } = useFetch<IPost[]>({
    path: ["posts"],
    type: "collection",
    conditions: [where("userId", "==", userData?.id)],
    dependencies: [userData]
  })

  const { data:replies } = useFetch<IPost[]>({
    path: ["posts"],
    type: "collection",
    conditions: [where("replyingTo", "!=", null)],
    dependencies: [userData]
  })

  const { data:reposts } = useFetch<IPost[]>({
    path: ["posts"],
    type: "collection",
    conditions: [where("reposterId", "==", userData?.id)],
    dependencies: [userData]
  })

  const { data:bookmarks } = useFetch<IPost[]>({
    path: ["users", userData?.id ?? "", "bookmarked"],
    type: "collection",
    dependencies: [userData],
    get: !isMe
  })

  const tabs = {
    posts: <Posts posts={posts} />,
    replies: <Posts posts={replies} />,
    reposts: <Posts posts={reposts} />,
    // Tabs for logged-in user profile
    ...(isMe && {
      bookmarks: <Posts posts={bookmarks} />
    })
  }

  if (isLoading) return <Loader />
  if (!userData?.name) return <>Error</>

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
            {isMe ? (
              <Link to="/user/edit">
                <Button size={"sm"} variant="outline" pill>Edit Profile</Button>
              </Link>
            ) : (
              <Button size={"sm"} variant="light" pill>Follow</Button>
            )}
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