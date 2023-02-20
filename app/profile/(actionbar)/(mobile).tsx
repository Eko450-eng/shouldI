'use client'

import { Affix, Group, Paper } from "@mantine/core"
import Image from 'next/image'


export default function Mobile({ props }: { props: { avatar: any, links: any } }) {
  const { avatar, links } = props
  return (
    <Affix
      position={{ bottom: 0, left: 0 }}
    >
      <Paper>
        <Group
          position="apart"
          sx={{ width: "100vw" }}
        >
          <Image
            alt={`Avatar Image of the user`}
            className="profile-icon"
            width="50"
            height="50"
            src={avatar}
          />
          {links}
        </Group>
      </Paper>
    </Affix>
  )
} 
