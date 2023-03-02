'use client'
import { Button, Input } from "@mantine/core";
import pb from "app/(pb_functions)";
import { useState } from "react";
import { sendPush } from "./[user]/messaging";

export default function AdminNotificationPanel() {
  const [message, setMessage] = useState({
    title: "",
    msg: "",
    target: ""
  })

  async function sendMsg() {
    if (!pb.authStore.model) return
    const target = message.target
    const filter = target ? { filter: `userID=  "${pb.authStore.model.id}"` } : ""

    await pb.collection("pushDevices").getFullList(1, { ...filter })
      .then(devices => {
        devices.forEach(device => {
          sendPush(message.title, message.msg, device.device)
        })
      })
  }

  return (
    <div className="flex-center">
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
    </div>
  )
}
