'use client'
import { Button, Text } from "@mantine/core";
import pb from "app/(pb_functions)";
import { Input } from '@mantine/core'
import { useEffect, useState } from "react";
import { saveMessagingDeviceToken, sendPush } from "./messaging";

export default function User() {
  const [messageToken, setMessageToken] = useState<string>("")
  const [message, setMessage] = useState({
    title: "",
    msg: ""
  })

  async function handleSubscription() {
    saveMessagingDeviceToken()
      .then(res => {
        if (res) setMessageToken(res)
      })
  }

  async function sendMsg() {
    if (!pb.authStore.model) return
    await pb.collection("pushDevices").getFullList(1, { filter: `userID=  "${pb.authStore.model.id}"` })
      .then(devices => {
        devices.forEach(device => {
          sendPush(message.title, message.msg, device.device)
        })
      })
  }

  return (
    <div className="flex-center">
      <Button onClick={() => handleSubscription()}>Enable notification</Button>

      <Input
        onChange={(v) => setMessage({ ...message, title: v.target.value })}
        placeholder="Title"
        value={message.title}
      />

      <Input
        onChange={(v) => setMessage({ ...message, msg: v.target.value })}
        placeholder="Title"
        value={message.msg}
      />
      <Button onClick={() => sendMsg()}>Test notification</Button>

      <Text color="gray">If you have any issues please send a message to ekrem@wipdesign.de with your PushNotification Token: {messageToken}</Text>

    </div>
  )
}
