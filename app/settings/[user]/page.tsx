'use client'
import { Button, Text } from "@mantine/core";
import { IUser } from "interfaces/interfaces";
import { useEffect, useState } from "react";

export default function User({ params }: { params: { user: IUser } }) {
  const [subscribe, setSubscribe] = useState(false)

  async function handleSubscription() {
    await navigator.serviceWorker.register('./serviceWorker.js')
      .then(reg => {
        reg?.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: 'BLo1RSUB_siVS-KU6gDsVN72MibaUn8rPfPVay0tHJws6JbV_ljMAR3CEcjZqPH1uKF4MKpOYIsjYkmkPM8ypGY',

        }).then(sub => {
          console.log(sub.toJSON())
        })
      })
  }

  useEffect(() => {
    handleSubscription()
    setSubscribe(false)
  }, [subscribe])

  return (
    <>
      <Button onClick={() => { setSubscribe(true) }}>Still in development</Button>
    </>
  )
}
