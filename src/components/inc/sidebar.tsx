import { AiFillHome, AiFillMessage, AiOutlineSearch, AiOutlineUser } from "react-icons/ai"
import { NavLink, useLocation } from "react-router-dom"

const Sidebar = () => {

  const { pathname } = useLocation()
  const iconSize = 28

  const navs = [
    {
      icon: AiFillHome,
      route: "/home",
    },
    {
      icon: AiOutlineSearch,
      route: "/explore",
    },
    {
      icon: AiFillMessage,
      route: "/messages",
    },
    {
      icon: AiOutlineUser,
      route: "/profile",
    }
  ]

  return (
    <nav className="fixed h-screen w-16 flex flex-col justify-center gap-8">
      {navs.map((nav) => (
        <NavLink to={nav.route}>
          <nav.icon
            size={iconSize}
            color={pathname === nav.route ? "#1DA1F2" : "#ffffff"}
          />
        </NavLink>
      ))}
    </nav>
  )
}

export default Sidebar