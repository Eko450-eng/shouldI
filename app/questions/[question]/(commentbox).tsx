import { Group, Stack, Text } from "@mantine/core";
import pb from "app/(pb_functions)";
import Image from 'next/image'
import { Record } from "pocketbase";
import { useState } from "react";

export default function Commentbox({ props }: { props: { userID: string, username: string, message: string } }) {
  const { username, userID, message } = props
  const placeholder = `${process.env.NEXT_PUBLIC_DBURL}/api/files/assets/ocmfvobwbq7xu1u/frame_2_qAqNR4gVxy.png`
  const [avatar, setAvatar] = useState<string>(placeholder)

  pb.collection("users").getOne(userID, { $autoCancel: false })
    .then((e: Record) => {
      if (!e.image) return
      setAvatar(`${process.env.NEXT_PUBLIC_DBURL}/api/files/users/${userID}/${e.image}`)
    })

  return (
    <Group className="commentbox" >
      <Image
        alt={`Avatar Image of the user`}
        className="profile-icon"
        src={avatar}
        width="40"
        height="40"
      />
      <Stack spacing="xs">
        <Text variant="gradient" size="sm">{username}</Text>
        <Text>{message}</Text>
      </Stack>
    </Group>
  )
}
