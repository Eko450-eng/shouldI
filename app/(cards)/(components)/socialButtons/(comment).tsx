'use client'
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ActionIcon, Text } from "@mantine/core";
import pb from "app/(pb_functions)";
import { IQuestion } from "interfaces/interfaces";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CommentButton({ props }: { props: IQuestion }) {
  const [amount, setAmount] = useState<number>(0)

  async function getAmount() {
    if (!props.comments) return
    const commentsInThisThread = await pb.collection("comments").getList(1, 50, { $autoCancel: false, filter: `thread="${props.id}"` })
    setAmount(commentsInThisThread.items.length)
  }

  useEffect(() => { getAmount() }, [props])

  const router = useRouter()

  return (
    <ActionIcon onClick={() => router.push(`/questions/${props.id}`)} >
      <Text sx={{ paddingRight: ".5rem" }}>
        {amount}
      </Text>
      <Text>
        <FontAwesomeIcon icon={faComment} />
      </Text>
    </ActionIcon>
  )
}
