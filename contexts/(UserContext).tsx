'use client'

import pb from "app/(pb_functions)";
import { IUser } from "interfaces/interfaces";
import { createContext, useEffect, useState } from "react"

interface IUserContext {
  user: IUser | null | undefined;
  validated: boolean;
  setUser: (user: IUser) => void;
}

export const UserContext = createContext<IUserContext>({
  user: null,
  validated: false,
  setUser: () => { }
})

export default function UserContextProvider({ children }: { children: any }) {
  const [currentUser, setCurrentUser] = useState<IUser | null>();

  useEffect(() => {
    if (!pb.authStore.model) setCurrentUser(null)
    setCurrentUser(pb.authStore.model as IUser)
  })

  pb.authStore.onChange(() => {
    if (!pb.authStore.model) setCurrentUser(null)
    setCurrentUser(pb.authStore.model as IUser)
  })

  return (
    <UserContext.Provider value={{
      user: currentUser,
      validated: false,
      setUser: setCurrentUser
    }}>
      {children}
    </UserContext.Provider>
  )
}
