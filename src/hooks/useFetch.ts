import { dataExists, getCollection, getData } from "@/services/firebase/firestore"
import { useEffect, useState } from "react"

interface Params {
  path: string[]
  type?: "data" | "collection" | "exists"
  conditions?: any[]
  dependencies?: any[]
  get?: boolean
}

export function useFetch <T>(params:Params) {

  const {
    path,
    type,
    conditions,
    dependencies,
    get:g
  } = params
  const get = g ? g : true

  const [data, setData] = useState<T>()
  const [isLoading, setIsLoading] = useState(true)

  const handleFetch = async () => {
    let data:any

    if (type === "collection") {
      data = await getCollection(
        path[0],
        conditions ?? [],
        path.length > 2 ? path.slice(1, path.length) : []
      )
    } else if (type === "exists") {
      data = await dataExists(
        path[0],
        path[1],
        path.length > 2 ? path.slice(2, path.length) : []
      )
    } else {
      data = await getData(
        path[0],
        path[1],
        path.length > 2 ? path.slice(2, path.length) : []
      )
    }

    setData(data)
    setIsLoading(false)
  }

  const handleRefresh = () => {
    setData(undefined)
    setIsLoading(true)
    handleFetch()
  }

  const updateData = (data:any) => {
    if (type === "collection" || type === "exists") {
      throw 'cannot update collection data, try "setData"'
    }

    setData((prev) => ({
      ...prev,
      ...data
    }))
  }

  useEffect(() => {
    if (!get) return
    handleFetch()
  }, [get, ...(dependencies ?? [])])

  return {data, isLoading, refresh:handleRefresh, setData, updateData}
}