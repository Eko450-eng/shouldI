'use client'

import { Affix, Group, Paper } from "@mantine/core"
import pb from "app/(pb_functions)"
import Image from 'next/image'
import { useRouter } from "next/navigation"


export default function Mobile({ props }: { props: { avatar: string, links: JSX.Element[] } }) {
  const { avatar, links } = props
  const router = useRouter()
  return (
    <Affix
      position={{ bottom: 0, left: 0 }}
      sx={theme => ({ backgroundColor: theme.colors.nord_gray[4], width: "100%" })}
    >
      <nav>
        <Paper
          sx={{ background: "none", paddingBottom: "2rem" }}
        >
          <Group
            position="apart"
            sx={{ width: "90%", marginInline: "auto", paddingTop: "1rem" }}
          >
            <Image
              priority
              onClick={() => {
                if (!pb.authStore.model) return
                router.push(`/Settings/${pb.authStore.model.id}`)
              }}
              alt={`Avatar Image of the user`}
              className="profile-icon"
              width="30"
              height="30"
              src={avatar}
            />
            {links}
          </Group>
        </Paper>
      </nav>
    </Affix>
  )
} 
