import { Outlet } from "react-router"
import Tabs from "../components/profile/Tabs"


const ProfileLayout = () => {
  return (
    <>
        <Tabs />
        <Outlet />
    </>
  )
}

export default ProfileLayout