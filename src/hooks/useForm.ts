import { useState } from "react"

export const useForm = <T>(initialValues:T) => {
  const [cred, setCred] = useState<T>(initialValues)
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (key:string, value:any) => {
    setCred(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const clearForm = () => {
    setCred(initialValues)
  }

  return {cred, handleChange, clearForm, isLoading, setIsLoading}
}