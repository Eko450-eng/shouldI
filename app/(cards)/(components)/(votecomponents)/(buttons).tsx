'use client'
import { useEffect, useState } from "react"
import pb from "../../../(pb_functions)"
import { IQuestion } from "interfaces/interfaces"
import VoteButton from "./(VoteButton)"
import { Group, Progress } from "@mantine/core"

export default function Buttons({ card }: { card: IQuestion }) {
  const [currentState, setCurrentState] = useState<string>("pending");
  const [voteValue, setVoteValue] = useState<number>(0);
  const [percentage, setPercentage] = useState<{ 1: number, 2: number }>({ 1: 0, 2: 0 })
  const [didVote, setDidVote] = useState<boolean>(false)

  async function checkIfVoted() {
    const voters = card.voters.voters
    const user = pb.authStore.model?.name

    voters.filter((k: { id: string, name: string, vote: number }) => {
      if (k.name == user) {
        setCurrentState("DIDVOTE")
        setCurrentState(`VOTE${k.vote}`)
        setVoteValue(k.vote)
        setDidVote(true)
      }
    });
  };

  async function checkIfAuthenticated() {
    if (!pb.authStore.isValid || !pb.authStore.model?.id) return
    setCurrentState("canVote")
    checkIfVoted()
  }

  const getPercentageVoted = async () => {
    const question: IQuestion = await pb.collection("questions").getOne(card.id, { $autoCancel: false })
    setPercentage({
      1: question.answerOne / (question.answerOne + question.answerTwo) * 100,
      2: question.answerTwo / (question.answerOne + question.answerTwo) * 100,
    })
  }

  useEffect(() => {
    getPercentageVoted()
    checkIfAuthenticated()
  }, [card])

  return (
    <Group className={`flex-center row`}>

      {didVote &&
        <Progress
          sx={{ width: "100%" }}
          size="xl"
          sections={[
            {
              value: percentage[1],
              label: `${card.optionNameOne}: ${card.answerOne}`,
              color: card.color1
            },
            {
              value: percentage[2],
              label: `${card.optionNameTwo}: ${card.answerTwo}`,
              color: card.color2
            }
          ]}
        />
      }

      <div>
        <VoteButton props={{ card: card, currentState: currentState, voteValue: voteValue, name: card.optionNameOne, votes: card.answerOne, vote: 1 }} />
        <VoteButton props={{ card: card, currentState: currentState, voteValue: voteValue, name: card.optionNameTwo, votes: card.answerTwo, vote: 2 }} />
      </div>
    </Group>
  )
}
