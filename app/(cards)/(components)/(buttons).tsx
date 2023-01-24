'use client'
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import pb from "../../(pb_functions)"
import answer from "../(logic)"
import { IQuestion, IVoter } from "interfaces/interfaces"

interface IBtn {
  name: string
  votes: number
  vote: number
}

export default function Buttons({ question }: { question: IQuestion }) {
  const [voted, setVoted] = useState<0 | 1 | 2>(0)
  const [visibleVotes, setVisibleVotes] = useState<boolean>(false)
  const router = useRouter()

  // Find what the user has voted for
  function displayAll() {
    const votedFor = question.voters.voters.find((vote: IVoter) => {
      if (!vote || !pb.authStore.model) return
      return vote.id == pb.authStore.model.id
    })

    if (votedFor && pb.authStore.isValid) {
      //Show the users what others have voted for
      setVisibleVotes(true)

      // Mark users vote
      switch (votedFor.vote) {
        case 1:
          setVoted(1)
          return
        case 2:
          setVoted(2)
          return
      }
    }
  }

  useEffect(() => {
    displayAll()
  }, [])

  function Btn({ props }: { props: IBtn }) {
    const { name, votes, vote } = props
    return (
      <button
        className={`${voted == vote ? "btn answer-selection-selected" : "btn answer-selection-text"}`}
        onClick={() => {
          if (!pb.authStore.model) return
          answer(pb.authStore.model, question.id, vote).then(
            (res: any) => pb.collection("questions").update(question.id, res).then((res) => router.refresh())
          )
        }}>
        {name} {visibleVotes ? votes : ""}
      </button>
    )
  }


  return (
    <div className="answer-selection">
      <Btn props={{ name: question.optionNameOne, votes: question.answerOne, vote: 1 }} />
      <Btn props={{ name: question.optionNameTwo, votes: question.answerTwo, vote: 2 }} />
    </div>
  )
}
