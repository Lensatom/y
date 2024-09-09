import { Button, Text } from "@/components/base"
import { Avatar, AvatarFallback, AvatarImage, Container } from "@/components/inc"
import { FaBirthdayCake, FaCalendar } from "react-icons/fa"

const Profile = () => {
  return (
    <div className="h-screen w-full bg-background">
      <div className="w-full h-44 overflow-hidden">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2dhrA2w0kJcS4h5Ww-yipVpz8kCDsLY0M9w&s" className="w-full" />
      </div>
      <Container className="flex flex-col gap-2">
        <div className="w-full flex justify-between items-end -mt-20">
          <Avatar className="w-40 h-40 border-4 border-background">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="mb-5">
            <Button size={"sm"} variant="outline" pill>Edit Profile</Button>
          </div>
        </div>
        <div>
          <Text size="xl" bold>Lens</Text>
          <Text variant="secondary">@lensatom</Text>
        </div>
        <div>
          <Text>I'm a content creator and a developer</Text>
        </div>
        <div className="flex gap-4 items-center">
          <Text size="sm" variant="secondary" className="flex gap-1 items-center">
            <FaBirthdayCake size={14} />
            Born June 20, 2004
          </Text>
          <Text size="sm" variant="secondary" className="flex gap-1 items-center">
            <FaCalendar size={14} />
            Joined July 21, 2024
          </Text>
        </div>
      </Container>
    </div>
  )
}

export default Profile