import { Button, TextArea } from "@/components/base";
import { Avatar, AvatarFallback, AvatarImage, Container, Post, PostLengthProgress } from "@/components/inc";
import { useState } from "react";
import 'react-circular-progressbar/dist/styles.css';

const Home = () => {

  const [newPost, setNewPost] = useState("")

  const handlePostChange = (e:any) => {
    setNewPost(e.target.value)
  }

  const posts = [
    {
      id: "1",
      photoURL: "https://img.freepik.com/free-photo/woman-wearing-blank-shirt-medium-shot_23-2149345055.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1725494400&semt=ais_hybrid",
      name: "Lara William",
      handle: "@larawilly",
      content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia quia dolores minus laudantium eligendi repellat, fugiat neque eum id doloribus ex consequatur corporis? Libero quia, iste quisquam perspiciatis iusto ea.",
      likeCount: 40,
      replyCount: 20,
      repostCount: 2,
      viewCount: 200,
    },
    {
      id: "2",
      photoURL: "data:image/jpeg;base64,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",
      name: "David Motola",
      handle: "@dave.omo",
      content: "Hi Y, This is so cool!",
      likeCount: 60,
      replyCount: 10,
      repostCount: 5,
      viewCount: 250,
    }
  ]


  return (
    <div className="min-h-screen w-full bg-background">
      <Container className="border-b-0.5 flex flex-col items-end pt-10">
        <div className=" w-full flex gap-3">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="w-full border-b-0.5">
            {/* <p
              onClick={() => textAreaRef.current.focus()}
              className="text-xl text-gray-400"
            >
              {newPostContent}
            </p> */}
            <TextArea
              variant="ghost"
              placeholder="What's happenening?!"
              className="placeholder:text-xl w-full min-h-10 h-12 max-h-52 py-1 outline-none text-lg"
              value={newPost}
              onChange={handlePostChange}
            ></TextArea>
          </div>
        </div>
        <div className="py-5 flex items-center h-full gap-5">
          {newPost && (
            <div className="border-r-0.5 h-full px-5">
              <PostLengthProgress postLength={newPost.length} />
            </div>
          )}
          <Button disabled={!newPost} pill className="px-8">Post</Button>
        </div>
      </Container>
      <div>
        {posts.map((post) => <Post {...post} />)}
      </div>
    </div>
  )
}

export default Home