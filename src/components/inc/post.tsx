import { BiRepost } from "react-icons/bi";
import { BsChat, BsHeart } from "react-icons/bs";
import { FaRegBookmark } from "react-icons/fa";
import { IoIosStats } from "react-icons/io";
import { MdShare } from "react-icons/md";
import { Button, Text } from "../base";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import Container from "./container";
import { Link } from "react-router-dom";

interface Props {
  id: string,
  photoURL: string;
  name: string;
  handle: string;
  content: string;
  likeCount: number;
  replyCount: number;
  repostCount: number;
  viewCount: number;
}

const Post = (props:Props) => {

  const {
    id,
    photoURL,
    name,
    handle,
    content,
    likeCount,
    replyCount,
    repostCount,
    viewCount
  } = props

  return (
    <Link to={`/status/${id}`}>
      <Container className="py-4 border-b-0.5 flex items-start gap-2">
        <Avatar>
          <AvatarImage src={photoURL} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="w-full">
          <Link to="" className="flex items-center gap-1">
            <Text variant="link" bold>{name}</Text>
            <Text size="sm" variant="secondary">{handle}</Text>
          </Link>
          <Text size="sm" className="text-white">{content}</Text>
          <div className="w-full pt-3 flex justify-between items-center">
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
              {/* <Text size="sm">200</Text> */}
            </div>
          </div>
        </div>
      </Container>
    </Link>
  )
}

export default Post