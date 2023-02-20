'use client'
import { Affix, Center, Group, Navbar, Paper, Stack } from "@mantine/core"
import Image from 'next/image'


export default function Desktop({ props }: { props: { avatar: any, links: any } }) {
  const { avatar, links } = props
  return (
    <Affix
      position={{ top: 0, left: 0 }}
    >
      <Paper sx={{ height: "100vh" }}>
        <Group
          position="left"
          align="start"
          sx={{ width: "min-content" }}
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
