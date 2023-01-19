'use client'
import { Button } from "@mui/material";
import pb from "../../(pb_functions)";
import Image from 'next/image'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AvatarIcon({ openDrawer }: { openDrawer: (t: boolean) => void }) {
  const router = useRouter()

  const placeholder = `${process.env.NEXT_PUBLIC_DBURL}/api/files/assets/ocmfvobwbq7xu1u/frame_2_qAqNR4gVxy.png`
  const [avatar, setAvatar] = useState<string>(placeholder)

  pb.authStore.onChange(() => {
    router.refresh()
  })

  useEffect(() => {
    if (!pb.authStore.model || !pb.authStore.model.image) return
    setAvatar(`${process.env.NEXT_PUBLIC_DBURL}/api/files/users/${pb.authStore.model.id}/${pb.authStore.model.image}`)
  })

  return (
    <div>
      <Button onClick={() => openDrawer(true)}>
        <Image
          alt={`Avatar Image of the user`}
          className="profile-icon"
          src={avatar}
          width="50"
          height="50"
        />
      </Button>
    </div>
  )
}
