import { Input, Text } from "@/components/base"
import { Container } from "@/components/inc"
import { FaSearch } from "react-icons/fa"
import { Trend } from "./components"

const Trending = () => {

  const trends = [
    {
      trend: "#hello y",
      postCount: 200
    },
    {
      trend: "#weldone",
      postCount: 500
    },
  ]

  return (
    <Container className="min-h-screen flex flex-col gap-4 mt-2">
      <div className="w-full h-10 bg-border flex gap-5 items-center px-6 rounded-full">
        <FaSearch className="text-gray-400" />
        <Input variant="ghost" className="w-full" placeholder="Search" />
      </div>
      <div>
        <Text size="xl" bold>Trends for you</Text>
        <div className="flex flex-col gap-3 mt-4">
            {trends.map((trend) => <Trend {...trend} />)}
          </div>
      </div>
    </Container>
  )
}

export default Trending