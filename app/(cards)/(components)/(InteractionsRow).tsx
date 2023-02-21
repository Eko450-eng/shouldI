'use client'
import { faComment, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ActionIcon, Text, Group } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import pb from "../../(pb_functions)";
import { IQuestion } from "../../../interfaces/interfaces";

export default function InteractionsRow({ question }: { question: string }) {
  const [liked, setLiked] = useState<boolean>(false)
  const [likes, setLikes] = useState<number>(0)
  const [data, setData] = useState<IQuestion>()
  const user = pb.authStore.model
  const router = useRouter()

  //Get and set the data
  async function fetchData() {
    const q: IQuestion = await pb.collection("questions").getOne(question, { $autoCancel: false })
    return q
  }

  async function setUp() {
    const initialData = fetchData()
    setData(await initialData)
  }

  // Check if the user liked the post or not for styling and behavior of the like button
  async function didLike() {
    if (!data || !user) return
    if (data.likers.includes(user.id)) setLiked(true)
  }

  useEffect(() => {
    fetchData()
    setUp()
  }, [])

  function likeCount() {
    if (!data) return
    setLikes(data?.likers.length)
  }

  useEffect(() => {
    likeCount()
    didLike()
  }, [data])

  async function like() {
    fetchData()
    setUp()
    likeCount()
    didLike()
    if (!user || !data) return
    if (liked) {
      const myLike = data.likers.find((e: string) => e !== user.id)
      const newLikers = myLike ? myLike : []

      setLiked(false)
      pb.collection("questions").update(question, { likers: newLikers })
    } else {
      const newLikers = [...data.likers, user.id]

      setLiked(true)
      pb.collection("questions").update(question, { likers: newLikers })
    }
    setLikes(data.likers.length)
    setTimeout(() => didLike(), 250)
  }

  return (
    <Group
      sx={{ marginTop: ".5rem" }}
      position="apart">
      <ActionIcon onClick={() => router.push(`/questions/${data && data.id}`)}>
        <FontAwesomeIcon icon={faComment} />
      </ActionIcon>

      <ActionIcon onClick={like} >
        <Text sx={{ paddingRight: ".5rem" }}>
          {likes}
        </Text>
        <Text>
          <FontAwesomeIcon icon={faHeart} color={`${liked ? "#FE0034" : "white"}`} />
        </Text>
      </ActionIcon>

    </Group>
  )
}
