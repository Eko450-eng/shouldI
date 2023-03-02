'use client'
import { Affix, Group, Paper } from "@mantine/core"
import pb from "app/(pb_functions)"
import Image from 'next/image'
import { useRouter } from "next/navigation"


export default function Desktop({ props }: { props: { avatar: string, links: JSX.Element[] } }) {
  const { avatar, links } = props
  const router = useRouter()
  return (
    <Affix
      sx={theme => ({ backgroundColor: theme.colors.nord_gray[4], height: "100%" })}
      position={{ top: 0, left: 0 }}
    >
      <nav>
        <Paper sx={{ background: "none", height: "100%", paddingInline: ".5rem" }}>
          <Group
            position="left"
            align="start"
            sx={{ justifyContent: "center", width: "min-content" }}
          >
            <Image
              priority
              onClick={() => {
                if (!pb.authStore.model) return
                router.push(`/Settings/${pb.authStore.model.id}`)
              }}
              alt={`Avatar Image of the user`}
              className="profile-icon"
              width="50"
              height="50"
              src={avatar}
            />
            {links}
          </Group>
        </Paper>
      </nav>
    </Affix>
  )
}
