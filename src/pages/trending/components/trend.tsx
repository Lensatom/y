import { Text } from "@/components/base"
import { ITrend } from "@/interfaces"
import { Link } from "react-router-dom"

interface Props extends ITrend {}

const Trend = (props:Props) => {

  const {
    trend,
    postCount
  } = props

  return (
    <Link to={`/search?search=${encodeURIComponent(trend)}`} className="w-full flex flex-col">
      <Text size="sm" variant="secondary">Trending on Y</Text>
      <Text bold className="-mt-0.5">{trend}</Text>
      <Text size="sm" variant="secondary" className="-mt-0.5">{postCount} posts</Text>
    </Link>
  )
}

export default Trend