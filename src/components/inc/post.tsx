import { getDate, getHashtags, getTime, postHashtags } from "@/helpers";
import { useFetch } from "@/hooks";
import { IPost } from "@/interfaces";
import { addData, deleteData, updateData } from "@/services/firebase/firestore";
import { useUserStore } from "@/store";
import { increment, where } from "firebase/firestore";
import { BiRepost } from "react-icons/bi";
import { BsChat, BsHeart, BsHeartFill } from "react-icons/bs";
import { IoIosStats } from "react-icons/io";
import { MdBookmark, MdOutlineBookmarkBorder, MdShare } from "react-icons/md";
import { Link } from "react-router-dom";
import { Button, Text } from "../base";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import Container from "./container";

interface Props extends IPost {
  search?: string
  thread?: boolean
  ownsPage?: boolean
}

const Post = (props:Props) => {

  const {
    id,
    photoURL,
    name,
    handle,
    content:c,
    viewCount,
    createdAt,
    reposterName,
    // component props
    search,
    thread,
    ownsPage
  } = props

  const content = search ? c.split(search) : c

  if (ownsPage) {
    return (
      <div id={id} className="w-full pt-1 pb-4 flex flex-col items-start gap-3">
        {/* Poster's avatar */}
        <div className="flex items-center gap-2">
          <Avatar>
            {photoURL && <AvatarImage src={photoURL} />}
            <AvatarFallback>{name[0]}</AvatarFallback>
          </Avatar>
          <Link to="" className="flex flex-col items-start">
            <Text variant="link" bold>{name}</Text>
            <Text size="sm" variant="secondary">{handle}</Text>
          </Link>
        </div>

        {/* Post content */}
        <Text className="text-white">{content}</Text>

        {/* Date, time and view count */}
        <Text size="sm" variant="secondary">
          {getDate(createdAt)} &#8226;
          {getTime(createdAt)} &#8226;
          <span className="text-white">{" "}
            {viewCount}
          </span> Views
        </Text>

        {/* Actions performable on post (like, repost, e.t.c) */}
        <div className="w-full py-1 px-1 flex justify-between items-center border-y-0.5">
          <ActionPanel {...props} />
        </div>
      </div>
    )
  }

  return (
    <Container className={`${thread ? "pt-1" : "border-b-0.5 pt-4"} relative !pl-0`}>
      {reposterName && (
        <Link to="/user/">
          <Text size="sm" className="text-gray-400 flex items-center pb-2 gap-1 px-10 hover:underline">
            <BiRepost size={18} /> {reposterName} reposted
          </Text>
        </Link>
      )}
      {/* TODO: Add reposter... */}
      <Avatar className="absolute left-5">
        <AvatarImage src={photoURL} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div>
        <Link to="" className={`${thread ? "border-l-0.5" : ""} w-full ml-10 pl-6 flex items-center gap-1 pb-1`}>
          <Text variant="link" bold>{name}</Text>
          <Text size="sm" variant="secondary">{handle}</Text>
        </Link>
        <Link to={`/status/${id}`} className="flex w-full pl-10">
          <div className={`${thread ? "border-l-0.5" : ""} w-full flex pl-6 pb-1`}>
            {search ? (
              <Text className="w-full gap-1">
                {content[0]}
                <span className="text-primary hover:underline" onClick={() => window.location.reload()}>{search}</span>
                {content[1]}
              </Text>
            ) : (
              <Text>{content}</Text>
            )}
          </div>
        </Link>
        <div className={`${thread ? "border-l-0.5" : ""} w-full ml-10 pl-6 pr-10`}>
          <div className="w-full flex justify-between items-center pb-2">
            <ActionPanel {...props} />
          </div>
        </div>
      </div>
    </Container>
  )
}


const ActionPanel = (props:Props) => {

  const { id:userId, name:userName } = useUserStore(state => state)

  const {
    id,
    likeCount,
    replyCount,
    repostCount,
    viewCount
  } = props

  const { data:liked, setData:setLiked } = useFetch<boolean>({
    path: ["users", userId ?? "", "liked", id],
    type: "exists"
  })
  const { data:reposted, setData:setReposted } = useFetch<IPost[]>({
    path: ["posts"],
    type: "collection",
    conditions: [where("reposterId", "==", userId), where("repostRef", "==", id)]
  })
  const { data:bookmarked, setData:setBookmarked } = useFetch<boolean>({
    path: ["users", userId ?? "", "bookmarked", id],
    type: "exists"
  })

  const handleLike = async () => {
    setLiked(prev => !prev)

    if (liked) {
      const payload = {likeCount: increment(-1)}
      await updateData("posts", id, payload)
      await deleteData("users", userId ?? "", ["liked", id])
    } else {
      const payload = {likeCount: increment(1)}
      await updateData("posts", id, payload)
      await addData("users", userId ?? "", {liked: true}, ["liked", id])
    }
  }

  const handleRepost = async () => {
    if (reposted?.length) {
      setReposted([])
      await deleteData("posts", reposted[0].id)
      await updateData("posts", id, {repostCount: increment(-1)})
    } else {
      setReposted([props])
      await addData("posts", "auto", {
        ...props,
        reposterId: userId,
        reposterName: userName,
        repostRef: id
      })
      await updateData("posts", id, {repostCount: increment(1)})
      const hashtags = getHashtags(props.content)
      await postHashtags(hashtags)
    }
  }

  const handleBookmark = async () => {
    setBookmarked(prev => !prev)

    if (bookmarked) {
      await deleteData("users", userId ?? "", ["bookmarked", id])
    } else {
      await addData("users", userId ?? "", props, ["bookmarked", id])
    }
  }

  return (
    <>
    <Button variant="ghost" title="Reply" className="flex items-center gap-1 text-gray-500 hover:text-primary">
      <BsChat size={16} />
      <Text size="sm">{replyCount}</Text>
    </Button>
    <Button onClick={handleRepost} variant="ghost" title="Repost" className={`${reposted?.length ? "text-green-600" : "text-gray-500"} flex items-center gap-1 hover:text-green-600`}>
      <BiRepost size={22} />
      <Text size="sm">{repostCount}</Text>
    </Button>
    <Button onClick={handleLike} variant="ghost" title="Like" className={`${liked ? "text-pink-600" : "text-gray-500"} flex items-center gap-1 hover:text-pink-600`}>
      {liked ? <BsHeartFill size={14} /> : <BsHeart size={14} />}
      <Text size="sm">{likeCount}</Text>
    </Button>
    <Button variant="ghost" title="View" className="flex items-center gap-1 text-gray-500 hover:text-primary">
      <IoIosStats />
      <Text size="sm">{viewCount}</Text>
    </Button>
    <div className="flex items-center gap-1">
      <Button onClick={handleBookmark} variant="ghost" title="Share" className={`${bookmarked ? "text-primary" : "text-gray-500"} hover:text-primary`}>
        {bookmarked ? <MdBookmark size={19} /> : <MdOutlineBookmarkBorder size={19} />}
      </Button>
      <Button variant="ghost" title="Share" className="text-gray-500 hover:text-primary">
        <MdShare size={16} />
      </Button>
    </div>
    </>
  )
}

export default Post