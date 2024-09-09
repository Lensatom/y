import { Text } from "@/components/base"

interface Props {
  trend: string;
  postCount: number;
}

const Trend = (props:Props) => {

  const {
    trend,
    postCount
  } = props

  return (
    <div className="flex flex-col">
      <Text size="sm" variant="secondary">Trending on Y</Text>
      <Text bold className="-mt-0.5">{trend}</Text>
      <Text size="sm" variant="secondary" className="-mt-0.5">{postCount} posts</Text>
    </div>
  )
}

export default Trend