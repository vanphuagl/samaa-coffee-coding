import { createContext, useContext, ReactNode, useState } from 'react'

interface AppContextType {
  isAppComplete: boolean
  setIsAppComplete: (value: boolean) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAppComplete, setIsAppComplete] = useState(false)

  return <AppContext.Provider value={{ isAppComplete, setIsAppComplete }}>{children}</AppContext.Provider>
}

/* eslint-disable react-refresh/only-export-components */
export const useAppContext = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider')
  }
  return context
}
