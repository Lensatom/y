import { useState } from "react"

export const useForm = <T>(initialValues:T) => {
  const [cred, setCred] = useState<T>(initialValues)
  const [error, setError] = useState<T>(initialValues)
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (key:string, value:any) => {
    setCred(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const updateError = (key:string, value:any) => {
    setError(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const clearForm = () => {
    setCred(initialValues)
  }

  return {cred, error, updateError, handleChange, clearForm, isLoading, setIsLoading}
}