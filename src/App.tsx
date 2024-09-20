import { onAuthStateChanged } from "firebase/auth"
import { useEffect, useState } from "react"
import { FaSearch } from "react-icons/fa"
import { Route, Routes, useLocation, useNavigate } from "react-router-dom"
import { Input, Text } from "./components/base"
import { Loader, Sidebar } from "./components/inc"
import { useFetch } from "./hooks"
import { ITrend } from "./interfaces"
import { ChooseHandle, Welcome } from "./pages/auth"
import { Home, Posts } from "./pages/home"
import { Messages } from "./pages/messages"
import { Profile } from "./pages/profile"
import EditProfile from "./pages/profile/editProfile"
import { Search, Trending } from "./pages/trending"
import { Trend } from "./pages/trending/components"
import { auth } from "./services/firebase"
import { getData } from "./services/firebase/firestore"
import { useUserStore } from "./store"

function App() {

  const navigate = useNavigate()
  const { pathname } = useLocation()
  
  const { isLoggedIn, handle, login } = useUserStore((state) => state)
  const [isLoading, setIsLoading] = useState(true)

  const unauthRoutes = ["/"]

  const { data:trends } = useFetch<ITrend[]>({
    path: ["trends"],
    type: "collection"
  })

  useEffect(() => {
    if (isLoggedIn && !handle) {
      navigate("/chooseHandle")
      return
    }
    if (isLoggedIn && unauthRoutes.includes(pathname)) {
      navigate("/home")
    } else {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const uid = user.uid;
          const userData:any = await getData("users", uid)

          login(userData)
        }
        setIsLoading(false)
      });
    }
  }, [isLoggedIn])

  useEffect(() => {
    if (isLoading || isLoggedIn) return
    navigate("/")
  }, [isLoading])

  if (isLoading) return <Loader />
  return (
    <div className="relative px-24 flex flex-row">
      {pathname !== "/" && <Sidebar />}
      <main className="mx-16 w-full flex gap-8">
        <section className="w-3/5 min-h-screen h-fit border-x-0.5">
          <Routes>
            <Route path="" element={<Welcome />} />
            {/* {!handle &&  */}
            <Route path="/chooseHandle" element={<ChooseHandle />} />
            {/* } */}
            <Route path="/home" element={<Home />} />
            <Route path="/explore" element={<Trending />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/user">
              <Route path="me" element={<Profile />} />
              <Route path="edit" element={<EditProfile />} />
              <Route path=":id" element={<Profile />} />
            </Route>
            <Route path="/search" element={<Search />} />
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
              {trends?.map((trend) => <Trend {...trend} />)}
            </div>
          </div>
        </aside>
      </main>
    </div>
  )
}

export default App
