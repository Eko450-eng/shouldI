'use client'
import { Button, Text } from "@mantine/core";
import pb from "app/(pb_functions)";
import { IUser } from "interfaces/interfaces";
import { useEffect, useState } from "react";

export default function User({ params }: { params: { user: IUser } }) {
  const [subscribe, setSubscribe] = useState(false)

  async function handleSubscription() {
    await navigator.serviceWorker.register('/serviceWorker.js')
      .then(async (reg) => {
        const end = await reg?.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: 'BLo1RSUB_siVS-KU6gDsVN72MibaUn8rPfPVay0tHJws6JbV_ljMAR3CEcjZqPH1uKF4MKpOYIsjYkmkPM8ypGY',
        }).then(sub => {
          console.log(sub)
          console.log(sub.getKey("auth"))
          console.log(sub.getKey("p256dh"))
          pb.collection("pushKeys").create({
            "auth": sub,
            "p256dh": sub.getKey("auth"),
            "data": sub.getKey("p256dh")
          })
        })
        console.log(JSON.stringify(end))
      })
  }

  useEffect(() => {
    handleSubscription()
    setSubscribe(false)
  }, [subscribe])

  return (
    <>
      <Button onClick={() => {
        {
          handleSubscription()
        }
      }}>Still in development</Button>
    </>
  )
}
