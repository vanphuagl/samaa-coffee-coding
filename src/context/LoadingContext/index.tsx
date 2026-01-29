import { createContext, useContext, ReactNode, useState } from 'react'

interface LoadingContextType {
  isLoadingComplete: boolean
  setIsLoadingComplete: (value: boolean) => void
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined)

export const LoadingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoadingComplete, setIsLoadingComplete] = useState(false)

  return (
    <LoadingContext.Provider value={{ isLoadingComplete, setIsLoadingComplete }}>{children}</LoadingContext.Provider>
  )
}

/* eslint-disable react-refresh/only-export-components */
export const useLoadingContext = () => {
  const context = useContext(LoadingContext)
  if (!context) {
    throw new Error('useLoadingContext must be used within an LoadingProvider')
  }
  return context
}
