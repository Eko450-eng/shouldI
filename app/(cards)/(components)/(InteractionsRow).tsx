'use client'
import { faComment, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
    didLike()
    router.refresh()
  }

  return (
    <div className="interaction-row-wrapper">
      <button aria-label="comment section" className="btn-unstyled" onClick={() => router.push(`/questions/${data && data.id}`)}>
        <FontAwesomeIcon icon={faComment} />
      </button>
      <button
        onClick={like}
        className="interaction-row btn-unstyled">
        <p>{likes} <FontAwesomeIcon icon={faHeart} color={`${liked ? "#FE0034" : "white"}`} /></p>
      </button>
    </div>
  )
}
