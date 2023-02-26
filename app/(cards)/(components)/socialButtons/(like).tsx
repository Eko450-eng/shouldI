'use client'
import { faHeart } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ActionIcon, Text } from "@mantine/core"
import { showNotification } from "@mantine/notifications"
import pb from "app/(pb_functions)"
import { IQuestion } from "interfaces/interfaces"
import { useEffect, useState } from "react"

export default function LikeButton({ props }: { props: IQuestion }) {
  const [liked, setLiked] = useState<boolean>(false)
  const [amount, setAmount] = useState<number>(props.likers.length)
  const user = pb.authStore.model

  async function checkIfUserHasLiked() {
    if (!user) return
    setLiked(props.likers.includes(user.id))
  }

  function getAmount() {
    setAmount(props.likers.length)
  }

  useEffect(() => { getAmount() }, [props])

  useEffect(() => {
    checkIfUserHasLiked()
    getAmount()
  }, [])



  async function like() {
    if (!user) {
      showNotification({
        title: "Are you sure?",
        message: "Please login to be able to Like questions",
        color: "red"
      })
      return
    }

    if (liked) {
      const myLike = props.likers.find((e: string) => e !== user.id)
      const newLikers = myLike ? myLike : []

      setLiked(false)
      pb.collection("questions").update(props.id, { likers: newLikers })

    } else {
      const newLikers = [...props.likers, user.id]

      setLiked(true)
      pb.collection("questions").update(props.id, { likers: newLikers })
    }
  }


  return (
    <ActionIcon onClick={like} >
      <Text sx={{ paddingRight: ".5rem" }}>
        {amount}
      </Text>
      <Text>
        <FontAwesomeIcon icon={faHeart} color={`${liked ? "#FE0034" : "white"}`} />
      </Text>
    </ActionIcon>
  )
}
