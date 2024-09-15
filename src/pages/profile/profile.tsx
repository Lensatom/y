import { Button, Text } from "@/components/base"
import { Avatar, AvatarFallback, AvatarImage, Container, Post } from "@/components/inc"
import { getDate } from "@/helpers"
import { useFetch } from "@/hooks"
import { IPost } from "@/interfaces"
import { useUserStore } from "@/store"
import { where } from "firebase/firestore"
import { FaBirthdayCake, FaCalendar } from "react-icons/fa"

const Profile = () => {

  const userData = useUserStore(state => state)
  const defaultCoverPhoto = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSm8JCped4WqTx4FCFWk9dGSsHzaZJXJPUkBg&s"

  const { data:posts, isLoading } = useFetch<IPost[]>({
    path: ["posts"],
    type: "collection",
    conditions: [where("userId", "==", userData.id), where("reposterId", "==", userData.id)]
  })

  if (!userData.name) return <>Error</>

  return (
    <div className="h-screen w-full bg-background">
      <div className="w-full h-44 overflow-hidden bg-neutral-800 flex items-center">
        <img src={userData.coverPhotoURL ?? defaultCoverPhoto} className="w-full" />
      </div>
      <Container className="flex flex-col gap-2 border-b-0.5 pb-4">
        <div className="w-full flex justify-between items-end -mt-20">
          <Avatar className="w-40 h-40 border-4 border-background">
            <AvatarImage src={userData.photoURL ?? undefined} />
            <AvatarFallback>{userData.name[0]}</AvatarFallback>
          </Avatar>
          <div className="mb-5">
            <Button size={"sm"} variant="outline" pill>Edit Profile</Button>
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
      {posts && posts.map(post => <Post {...post} />)}
    </div>
  )
}

export default Profile