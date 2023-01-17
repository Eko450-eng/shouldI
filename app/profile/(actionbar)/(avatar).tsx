'use client'
import { Button } from "@mui/material";
import pb from "../../(pb_functions)";
import Image from 'next/image'

export default function AvatarIcon({ openDrawer, avatar }: { openDrawer: any, avatar: string }) {
  const img = avatar

  return (
    <div>
      {avatar &&
        <Button onClick={() => openDrawer(true)}>
          <Image
            alt={`Avatar Image of ${pb.authStore.model!.userName}`} className="profile-icon"
            src={img}
            width="50"
            height="50"
          />
        </Button>
      }
    </div>
  )
}
