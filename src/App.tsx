import { Route, Routes } from "react-router-dom"
import { Home } from "./pages/home"
import { Sidebar } from "./components/inc"
import { Trending } from "./pages/trending"
import { Messages } from "./pages/messages"
import { Profile } from "./pages/profile"

function App() {

  return (
    <div className="relative px-24 flex flex-row">
      <Sidebar />
      <main className="mx-16 w-full border-secondary">
        <section className=" w-2/3 border-x-0.5">
          <Routes>
            <Route path="" element={<Home />} />
            <Route path="/explore" element={<Trending />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </section>
        <aside>

        </aside>
      </main>
    </div>
  )
}

export default App
