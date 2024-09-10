import { Input, Text } from "@/components/base"
import { Container, Loader } from "@/components/inc"
import { ITrend } from "@/interfaces"
import { getCollection } from "@/services/firebase/firestore"
import { useEffect, useState } from "react"
import { FaSearch } from "react-icons/fa"
import { Trend } from "./components"
import { limit } from "firebase/firestore"

const Trending = () => {

  const [trends, setTrends] = useState<ITrend[] | null>(null)

  const getTrends = async () => {
    const trends:any = await getCollection("trends", [limit(10)])
    setTrends(trends)
  }

  useEffect(() => {
    getTrends()
  }, [])

  if (!trends) return <Loader />
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