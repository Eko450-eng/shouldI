'use client'
import { Button, Text } from "@mantine/core";
import pb from "app/(pb_functions)";
import { Input } from '@mantine/core'
import { useState } from "react";
import { sendPush } from "./messaging";
import { saveMessagingDeviceToken } from '../../../Firebase/messaging'
import { deleteThisToken } from '../../../Firebase/messaging'

export default function User() {
  const [message, setMessage] = useState({
    title: "",
    msg: ""
  })

  async function handleSubscription() {
    saveMessagingDeviceToken()
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

  async function deleteToken() {
    deleteThisToken()
  }


  return (
    <div className="flex-center">
      <Button onClick={() => handleSubscription()}>Enable notification</Button>
      <Button onClick={() => deleteToken()}>Disable notification</Button>

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
      <Text>If you still encounter any issue you can send a message to ekrem@wipdesign.de with your issue</Text>

    </div>
  )
}
