'use client'
import pb from '../../(pb_functions)'
import Menu from '../../profile/(menu)'
import { Drawer, Avatar } from "@mui/material";
import { useEffect, useState } from 'react';
import AvatarIcon from './(avatar)'
import Buttons from './(buttons)';
import Link from 'next/link';

export default function ActionBar() {
  const [avatar, setAvatar] = useState<string>("")
  const [drawer, setOpenDrawer] = useState<boolean>(false)

  function openDrawer(value: boolean) {
    setOpenDrawer(value)
  }
  useEffect(() => {
    setAvatar(`${process.env.NEXT_PUBLIC_DBURL}/api/files/users/m5aj5rabboghgwk/avatar_QhF6CXuBdp.png`)
  })

  return (
    <div className="action-bar">
      <div className="flex-center row space-between">
        <Link className="link-btn" href="/">
          <h2>Should I?</h2>
        </Link>
        <AvatarIcon openDrawer={(t: any) => openDrawer(t)} avatar={avatar} />
      </div>
      <Buttons />
      <Drawer
        PaperProps={{
          sx: {
            backgroundColor: "hsla(197, 100%, 5%, 1)",
            color: "white"
          }
        }}
        anchor={"right"}
        open={drawer}
        onClose={() => setOpenDrawer(false)}
      >
        <Avatar className="center">
          <img
            src={avatar}
            alt={pb.authStore.model ? pb.authStore.model.userName : "Null"}
          />
        </Avatar>
        {pb.authStore.isValid && <Menu close={(t: boolean) => setOpenDrawer(t)} user={pb.authStore.model!.id} />}
      </Drawer>
    </div>
  )
}
