'use client'
import { Button } from "@mantine/core";
import { IUser } from "interfaces/interfaces";
import { saveMessagingDeviceToken } from "./messaging";

export default function User({ params }: { params: { user: IUser } }) {

  async function handleSubscription() {
    saveMessagingDeviceToken()
  }

  return (
    <div className="flex-center">
      <Button onClick={() => { handleSubscription() }}>Enable notification</Button>
      <Button onClick={() => { }}>Test notification</Button>
    </div>
  )
}
