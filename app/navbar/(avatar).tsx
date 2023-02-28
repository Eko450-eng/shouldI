'use client'
import { Button } from '@mantine/core'
import pb from "../(pb_functions)";
import Image from 'next/image'
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

export default function AvatarIcon() {
  const placeholder = `${process.env.NEXT_PUBLIC_DBURL}/api/files/assets/ocmfvobwbq7xu1u/frame_2_qAqNR4gVxy.png`
  const [avatar, setAvatar] = useState<string>(placeholder)
  const router = useRouter()

  useEffect(() => {
    if (!pb.authStore.model || !pb.authStore.model.image) return
    setAvatar(`${process.env.NEXT_PUBLIC_DBURL}/api/files/users/${pb.authStore.model.id}/${pb.authStore.model.image}`)
  })

  return (
    <div>
      <Button className="btn-icon" variant="subtle" size="lg" compact
        onClick={() => {
          if (!pb.authStore.model) return
          router.push(`/${pb.authStore.model.id}`)
        }}>
        <Image
          alt={`Avatar Image of the user`}
          className="profile-icon"
          src={avatar}
          width="50"
          height="50"
        />
      </Button>
    </div >
  )
}
