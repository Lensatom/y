import { Button, Input, TextArea } from "@/components/base"
import { Avatar, AvatarFallback, AvatarImage, Container } from "@/components/inc"
import { DEFAULTCOVERPHOTO } from "@/constants/constants"
import { useForm } from "@/hooks"
import { updateData } from "@/services/firebase/firestore"
import { uploadFile } from "@/services/firebase/storage"
import { useUserStore } from "@/store"
import { useState } from "react"
import { BiSolidImageAdd } from "react-icons/bi"
import { useNavigate } from "react-router-dom"

const EditProfile = () => {

  const navigate = useNavigate()
  const userData = useUserStore(state => state)

  const initialValues = {
    name: userData.name ?? "",
    bio: userData.bio ?? ""
  }
  const { cred, handleChange, isLoading, setIsLoading} = useForm(initialValues)

  const [coverPhoto, setCoverPhoto] = useState<any>()
  const [profilePhoto, setProfilePhoto] = useState<any>()

  const handleSubmit = async (e:any) => {
    e.preventDefault()

    setIsLoading(true)

    await updateData("users", userData?.id ?? "", cred)

    if (profilePhoto) {
      const id = `${userData.id}photo`
      await uploadFile(profilePhoto[0], id ?? "")
      await updateData("users", userData.id ?? "", {photoURL: id})
    }
    if (coverPhoto) {
      const id = `${userData.id}cover`
      await uploadFile(coverPhoto[0], id ?? "")
      await updateData("users", userData.id ?? "", {coverPhotoURL: id})
    }

    navigate("/user/me")
  }

  if (!userData.name) return <>Error</>
  return (
    <div className="w-full bg-background">
      <div className="w-full relative h-44 overflow-hidden bg-neutral-800 flex items-center">
        <img src={coverPhoto ? URL.createObjectURL(coverPhoto[0]) : userData.coverPhotoURL ?? DEFAULTCOVERPHOTO} className="w-full" />
        <label htmlFor="coverPhoto" className="absolute w-full h-full flex cursor-pointer justify-center items-center opacity-30 bg-gray-800 hover:opacity-50 transition-all">
          <BiSolidImageAdd size={35} />
        </label>
        <input id="coverPhoto" type="file" accept=".png, .jpg, .jpeg" className="hidden" onChange={(e) => setCoverPhoto(e.target.files)} />
      </div>
      <Container className="flex flex-col gap-2 items-start border-b-0.5 pb-4">
        <div className="relative flex justify-between items-end -mt-20">
          <Avatar className="w-40 h-40 border-4 border-background">
            <AvatarImage src={profilePhoto ? URL.createObjectURL(profilePhoto[0]) : userData.photoURL ?? undefined} />
            <AvatarFallback>{userData.name[0]}</AvatarFallback>
          </Avatar>
          <label htmlFor="profilePhoto" className="absolute w-full h-full rounded-full flex cursor-pointer justify-center items-center opacity-30 bg-gray-800 hover:opacity-50 transition-all">
            <BiSolidImageAdd size={35} />
          </label>
          <input id="profilePhoto" type="file" accept=".png, .jpg, .jpeg" className="hidden" onChange={(e) => setProfilePhoto(e.target.files)} />
        </div>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
          <div className="border-0.5 p-3 rounded-md text-sm flex flex-col gap-1">
            <label htmlFor="name" className="text-gray-500">Name</label>
            <Input id="name" variant="ghost" required minLength={3} value={cred.name} onChange={((e) => handleChange("name", e.target.value))}  />
          </div>
          <div className="border-0.5 p-3 rounded-md text-sm flex flex-col gap-1">
            <label htmlFor="bio" className="text-gray-500">Bio</label>
            <TextArea id="bio" variant="ghost" rows={4} value={cred.bio} onChange={((e) => handleChange("bio", e.target.value))} />
          </div>
          <Button disabled={isLoading} type="submit" pill>Save</Button>
        </form>
      </Container>
    </div>
  )
}

export default EditProfile