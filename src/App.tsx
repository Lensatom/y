import { Route, Routes } from "react-router-dom"
import { Home } from "./pages/home"
import { Sidebar } from "./components/inc"
import { Trending } from "./pages/trending"
import { Messages } from "./pages/messages"
import { Profile } from "./pages/profile"
import { FaSearch } from "react-icons/fa"
import { Input, Text } from "./components/base"
import { Trend } from "./pages/trending/components"
import { Posts } from "./pages/posts"

function App() {

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
    <div className="relative px-24 flex flex-row">
      <Sidebar />
      <main className="mx-16 w-full flex gap-8">
        <section className="w-3/5 border-x-0.5">
          <Routes>
            <Route path="" element={<Home />} />
            <Route path="/explore" element={<Trending />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/status">
              <Route path=":id" element={<Posts />} />
            </Route>
          </Routes>
        </section>
        <aside className="w-2/5 mt-5 flex flex-col gap-4">
          <div className="w-full h-10 bg-border flex gap-5 items-center px-6 rounded-full">
            <FaSearch className="text-gray-400" />
            <Input variant="ghost" className="w-full" placeholder="Search" />
          </div>
          <div className="px-6 py-4 border-0.5 rounded-lg">
            <Text size="xl" bold>Trends for you</Text>
            <div className="flex flex-col gap-3 mt-4">
              {trends.map((trend) => <Trend {...trend} />)}
            </div>
          </div>
        </aside>
      </main>
    </div>
  )
}

export default App
