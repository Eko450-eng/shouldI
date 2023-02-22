'use client'

import { Affix, Group, Paper } from "@mantine/core"
import Image from 'next/image'


export default function Mobile({ props }: { props: { avatar: any, links: any } }) {
  const { avatar, links } = props
  return (
    <Affix
      position={{ bottom: 0, left: 0 }}
      sx={theme => ({ backgroundColor: theme.colors.nord_gray[4], width: "100%" })}
    >
      <Paper
        sx={{ background: "none", paddingBottom: "2rem" }}
      >
        <Group
          position="apart"
          sx={{ width: "90%", marginInline: "auto", paddingTop: "1rem" }}
        >
          <Image
            alt={`Avatar Image of the user`}
            className="profile-icon"
            width="30"
            height="30"
            src={avatar}
          />
          {links}
        </Group>
      </Paper>
    </Affix>
  )
} 
