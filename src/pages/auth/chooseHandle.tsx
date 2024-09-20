import { Button, Input, Text } from "@/components/base"
import { useForm } from "@/hooks"
import { getCollection, updateData } from "@/services/firebase/firestore"
import { useUserStore } from "@/store"
import { where } from "firebase/firestore"
import { useNavigate } from "react-router-dom"

const ChooseHandle = () => {

  const navigate = useNavigate()
  const userData = useUserStore(state => state)

  const initialValues = {
    handle: ""
  }
  const {cred, handleChange, updateError, isLoading, setIsLoading, error} = useForm(initialValues)

  const forbiddenHandles = ["me", "edit"]
  const forbiddenChars = [" ", "@", "/", ".", "#", "?", "=", "`", "'", '"']

  const suggestions = [
    `${userData.email?.split("@")[0]}`
  ]

  const useSuggestion = (suggestion:string) => {
    handleChange("handle", suggestion)
  }

  const handleValidation = async (handle:string) => {

    for (let i = 0; i < forbiddenHandles.length; i++) {
      if (handle === forbiddenHandles[i]) {
        updateError("handle", `"${forbiddenHandles[i]}" cannot be an handle`)
        return false
      }
    }

    for (let i = 0; i < forbiddenChars.length; i++) {
      if (handle.includes(forbiddenChars[i])) {
        updateError("handle", `Handle should not contain ${forbiddenChars[i] === " " ? "space" : `"${forbiddenChars[i]}"`}`)
        return false
      }
    }

    const existingUser = await getCollection("users", [where("handle", "==", `@${handle}`)])
    if (existingUser.length > 0) {
      updateError("handle", `Handle "@${handle}" has been taken`)
      return false
    }
    return true
  }

  const handleSubmit = async (e:any) => {
    e.preventDefault()
    setIsLoading(true)
    const handle = cred.handle.toLowerCase()

    const valid = await handleValidation(handle)
    console.log(valid)
    if (!valid) {
      setIsLoading(false)
      return
    }
    
    await updateData("users", userData.id ?? '', {handle: `@${handle}`})
    navigate("/home")
  }

  return (
    <div className="w-full absolute left-0 h-screen bg-background flex flex-col items-center justify-center gap-5">
      <Text size="xl" bold>Choose an Handle</Text>
      <form onSubmit={handleSubmit} className="flex gap-2 items-center">
        <Text size="lg" bold>@</Text>
        <Input required value={cred.handle ?? ""} onChange={(e) => handleChange("handle", e.target.value)} variant="outline" />
        <Button type="submit" disabled={!cred.handle || isLoading} className="rounded-md">Done</Button>
      </form>
      <Text variant="error" size="sm" className="-mt-2">{error.handle}</Text>
      <div className="flex flex-col items-center">
        <Text variant="secondary" size="sm">Suggestions</Text>
        <div className="flex mt-2">
          {suggestions.map((suggestion) => (
            <Button onClick={() => useSuggestion(suggestion)} variant="ghost" className="rounded-full border-0.5 !px-2 !py-1 !h-fit bg-gray-900">
              <Text variant="secondary" size="sm">@{suggestion}</Text>
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ChooseHandle