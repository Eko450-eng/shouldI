'use client'
import { Button, Text } from "@mantine/core";
import { IUser } from "interfaces/interfaces";

export default function User({ params }: { params: { user: IUser } }) {

  navigator.serviceWorker.getRegistration().then(reg => {
    reg?.pushManager.subscribe({
      userVisibleOnly: true
    }).then(sub => {
      console.log(sub.toJSON())
    })
  })

  return (
    <>
      <Text>Still in development</Text>
    </>
  )
}
