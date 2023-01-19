'use client'
import pb from '../../(pb_functions)'
import Menu from '../../profile/(menu)'
import { Drawer, Avatar } from "@mui/material";
import { useState } from 'react';
import AvatarIcon from './(avatar)'
import Link from 'next/link';

export default function ActionBar() {
  const [drawer, setOpenDrawer] = useState<boolean>(false)

  function openDrawer(value: boolean) { setOpenDrawer(value) }

  return (
    <div className="action-bar">
      <div className="flex-center row space-between">
        <Link className="link-btn" href="/">
          <h2>Should I?</h2>
        </Link>
        <AvatarIcon openDrawer={(t: boolean) => openDrawer(t)} />
      </div>

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
          <AvatarIcon openDrawer={(t: boolean) => openDrawer(t)} />
        </Avatar>

        <Menu
          close={(t: boolean) => setOpenDrawer(t)}
          user={pb.authStore.model ? pb.authStore.model.id : undefined}
        />
      </Drawer>
    </div>
  )
}
