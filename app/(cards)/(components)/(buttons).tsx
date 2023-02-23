'use client'
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import answer from "../(logic)"
import pb from "../../(pb_functions)"
import { IFirstAnswer, IQuestion, ISecondAnswer, IUser } from "interfaces/interfaces"
import { Button } from '@mantine/core'
import { showNotification } from "@mantine/notifications"

interface IBtn {
  name: string
  votes: number
  vote: 1 | 2
}

export default function Buttons({ card }: { card: IQuestion }) {
  const [currentState, setCurrentState] = useState<string>("pending");
  const [voteValue, setVoteValue] = useState<Number>(0);
  const router = useRouter()

  async function checkIfAuthenticated() {
    if (!pb.authStore.isValid || !pb.authStore.model?.id) return
    setCurrentState("canVote")
    checkIfVoted()
  }

  function checkIfVoted() {
    card.voters.voters.filter((k: { id: string, name: string, vote: number }) => {
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
          background: highlight ? theme.colors.nord_green[4] : theme.colors.nord_gray[6],
          color: highlight ? theme.colors.dark : theme.white,
          border: highlight ? "1px solid white"
            : "none"
        })}

        onClick={() => {
          if (!pb.authStore.model || currentState !== "canVote") {
            showNotification({
              title: "You shall not vote",
              message: "Pleas login to be able to vote",
              color: "red"
            })
            return
          }
          answer(pb.authStore.model as IUser, card.id, vote)
            .then(
              (value: IFirstAnswer | ISecondAnswer | undefined) => {
                if (!value) return
                pb.collection("questions").update(card.id, value)
                  .then(() => router.refresh())
              }
            ).catch((e) => {
              showNotification({
                title: "Opps",
                message: `${e.message}`,
                color: "red"
              })
            })
        }}>
        {displayText}
      </Button>
    )
  }

  return (
    <div className={`flex-center row`}>
      <Btn props={{ name: card.optionNameOne, votes: card.answerOne, vote: 1 }} />
      <Btn props={{ name: card.optionNameTwo, votes: card.answerTwo, vote: 2 }} />
    </div>
  )
}
