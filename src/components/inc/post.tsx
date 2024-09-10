import { BiRepost } from "react-icons/bi";
import { BsChat, BsHeart } from "react-icons/bs";
import { FaRegBookmark } from "react-icons/fa";
import { IoIosStats } from "react-icons/io";
import { MdShare } from "react-icons/md";
import { Button, Text } from "../base";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import Container from "./container";
import { Link } from "react-router-dom";
import { IPost } from "@/interfaces";

interface Props extends IPost {
  search?: string
  thread?: boolean
}

const Post = (props:Props) => {

  const {
    id,
    photoURL,
    name,
    handle,
    content:c,
    likeCount,
    replyCount,
    repostCount,
    viewCount,
    // component props
    search,
    thread
  } = props

  const content = search ? c.split(search) : c

  return (
    <Link to={`/status/${id}`}>
      <Container className={`${thread ? "" : "border-b-0.5 pt-4"} relative !pl-10`}>
        <Avatar className="absolute left-5">
          <AvatarImage src={photoURL} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className={`${thread ? "border-l-0.5" : ""} w-full pl-8`}>
          <Link to="" className="flex items-center gap-1">
            <Text variant="link" bold>{name}</Text>
            <Text size="sm" variant="secondary">{handle}</Text>
          </Link>
          {search ? (
            <Text className="w-full gap-1">
              {content[0]}
              <span className="text-primary hover:underline" onClick={() => window.location.reload()}>{search}</span>
              {content[1]}
            </Text>
          ) : (
            <Text>{content}</Text>
          )}
          <div className="w-full flex justify-between items-center pb-2">
            <Button variant="ghost" title="Reply" className="flex items-center gap-1 text-gray-500 hover:text-primary">
              <BsChat size={16} />
              <Text size="sm">{replyCount}</Text>
            </Button>
            <Button variant="ghost" title="Repost" className="flex items-center gap-1 text-gray-500 hover:text-green-500">
              <BiRepost size={22} />
              <Text size="sm">{repostCount}</Text>
            </Button>
            <Button variant="ghost" title="Like" className="flex items-center gap-1 text-gray-500 hover:text-pink-600">
              <BsHeart size={14} />
              <Text size="sm">{likeCount}</Text>
            </Button>
            <Button variant="ghost" title="View" className="flex items-center gap-1 text-gray-500 hover:text-primary">
              <IoIosStats />
              <Text size="sm">{viewCount}</Text>
            </Button>
            <div className="flex items-center gap-3">
              <Button variant="ghost" title="Bookmark" className="text-gray-500 hover:text-primary">
                <FaRegBookmark size={15} />
              </Button>
              <Button variant="ghost" title="Share" className="text-gray-500 hover:text-primary">
                <MdShare size={16} />
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </Link>
  )
}

export default Post