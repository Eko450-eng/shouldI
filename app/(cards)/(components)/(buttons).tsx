'use client'
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import answer from "../(logic)"
import pb from "../../(pb_functions)"
import { IQuestion } from "interfaces/interfaces"
import { Button } from '@mantine/core'

interface IBtn {
  name: string
  votes: number
  vote: 1 | 2
}

export default function Buttons({ question }: { question: IQuestion }) {
  const [currentState, setCurrentState] = useState<string>("pending");
  const [voteValue, setVoteValue] = useState<Number>(0);
  const router = useRouter()

  async function checkIfAuthenticated() {
    if (!pb.authStore.isValid || !pb.authStore.model?.id) return
    setCurrentState("canVote")
    checkIfVoted()
  }

  function checkIfVoted() {
    question.voters.voters.filter((k) => {
      if (k.name == pb.authStore.model!.name) {
        setCurrentState("DIDVOTE")
        setCurrentState(`VOTE${k.vote}`)
        setVoteValue(k.vote)
      }
    });
  };

  useEffect(() => {
    checkIfAuthenticated()
  })

  function Btn({ props }: { props: IBtn }) {
    const { name, votes, vote } = props
    const displayText: String = `${name} ${voteValue > 0 ? votes : ""}`

    const highlight: boolean = vote == voteValue

    return (
      <Button
        sx={(theme) => ({
          background: highlight ? theme.colors.nord_green[4] : theme.colors.nord_pink[3],
          color: highlight ? theme.primaryColor : theme.white,
          border: highlight ? "1px solid white"
            : "none"
        })}


        onClick={() => {
          if (!pb.authStore.model || currentState !== "canVote") return
          answer(pb.authStore.model, question.id, vote).then(
            (res: any) => {
              console.log(res)
              pb.collection("questions").update(question.id, res)
                .then(() => router.refresh())
            }
          )
        }}>
        {displayText}
      </Button>
    )
  }


  return (
    <div className={`flex-center row`}>
      <Btn props={{ name: question.optionNameOne, votes: question.answerOne, vote: 1 }} />
      <Btn props={{ name: question.optionNameTwo, votes: question.answerTwo, vote: 2 }} />
    </div>
  )
}
