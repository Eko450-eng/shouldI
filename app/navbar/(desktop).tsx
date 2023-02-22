'use client'
import { Affix, Group, Paper } from "@mantine/core"
import Image from 'next/image'


export default function Desktop({ props }: { props: { avatar: any, links: any } }) {
  const { avatar, links } = props
  return (
    <Affix
      sx={theme => ({ backgroundColor: theme.colors.nord_gray[4], height: "100%" })}
      position={{ top: 0, left: 0 }}
    >
      <Paper sx={{ background: "none", height: "100%", paddingInline: ".5rem" }}>
        <Group
          position="left"
          align="start"
          sx={{ justifyContent: "center", width: "min-content" }}
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
