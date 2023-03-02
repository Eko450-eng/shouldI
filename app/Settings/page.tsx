'use client'
import pb from "app/(pb_functions)"
import { IUser } from "interfaces/interfaces"
import { useState } from "react"
import AdminNotificationPanel from "./(AdminNotifications)"

export default function Page() {
  // const [role, setRole] = useState<boolean>(false)
  // pb.authStore.onChange((e) => {
  //   if (!pb.authStore.model) return
  //   const user = pb.authStore.model as IUser
  //   if (!user.role) return
  //   const state = user.role >= 8
  //   console.log(state)
  //   setRole(state)
  // })

  return (
    <AdminNotificationPanel />
  )
}
